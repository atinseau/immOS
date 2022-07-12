import type { NextPage } from 'next'

import axios from 'axios'
import { useEffect, useState } from 'react'

import { onMount } from "@hooks"

interface Todo {
	id: number
	title: string
	completed: boolean
}

const Home: NextPage = () => {

	const [value] = onMount(async () => {
		const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
		return data as Todo[]
	})

	useEffect(() => {
		console.log(value)
	}, [value])

	return (<h1>salut</h1>)
}

export default Home
