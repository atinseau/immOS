import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMetaData } from '../todos.module';

import { TodosController } from "../todos.controller"
import { MongooseModule } from '@nestjs/mongoose';

describe('TodosController', () => {
	let controller: TodosController;

	beforeEach(async () => {

		ModuleMetaData.imports.push(
			MongooseModule.forRoot('mongodb://localhost:27017', {
				dbName: 'todos'
			}),
		)

		const module: TestingModule = await Test.createTestingModule(ModuleMetaData).compile();

		controller = module.get<TodosController>(TodosController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it("get all todos", async () => {
		const todos = await controller.index()
		expect(todos.length).toBe(0)
	})
});
