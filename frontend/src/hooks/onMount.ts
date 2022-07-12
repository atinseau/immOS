import { useEffect, useRef, useState } from "react"


export default function onMount<T> (fn: () => T): [Awaited<T>, boolean] {

	const mounted = useRef(false)
	const [output, setOutput] = useState<T | null>(null)

	useEffect(() => {
		if (mounted.current)
			return
		;(async () => setOutput(await fn() || null))()
		mounted.current = true
	}, [])

	return [output as Awaited<T>, mounted.current]
}