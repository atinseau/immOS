import os
import signal
import subprocess
from threading import Thread
from typing import Optional, TypedDict
import psutil
import json

paused = False

Command = TypedDict("Command", {
	"name": str,
	"command": str,
	"stdout": Optional[str]
})


class Process (Thread):
	def __init__(self, command: Command):
		super().__init__(name=command["name"])

		self.command = command
		self.stop = False

	def kill(self):
		process = psutil.Process(self.process.pid)
		for proc in process.children(recursive=True):
			proc.kill()
		process.kill()

		self.stop = True
		
	def __launch__(self):
		self.process = subprocess.Popen(
			[self.command["command"]],
			shell=True,
			preexec_fn=lambda: os.setpgrp(),
			stdout=subprocess.PIPE
		)

	def run(self):
		self.__launch__()
		while True and not self.stop:
			line = self.process.stdout.readline()
			if not line:
				break
			if not self.stop:
				print("[{}] {}".format(self.name, line.decode("utf-8")), end="")
		print("\n[{}] Process finished".format(self.name))



class Commands:
	def __init__(self):
		self.threads: list[Process] = []
		signal.signal(signal.SIGINT, self.handler)
	
	def register(self, command: Command):
		thread = Process(command)
		self.threads.append(thread)

	def start(self):
		[thread.start() for thread in self.threads]
		for thread in self.threads:
			thread.join()

	def handler(self, signum, frame):
		paused = True
		i = input("\nAre you sure you want to quit? (y/n) ")
		if i == "y":
			for thread in self.threads:
				thread.kill()
		paused = not paused

commands = Commands()

with open('../config.json') as f:
	config = json.load(f)
	commands: list[Command] = config["commands"]
	for command in commands:
		commands.register(command)
	commands.start()



