import { useState, useEffect } from 'react'

export const clearDeprecatedKeys = (keys: string[]) => {
	for (const key of keys) {
		localStorage.removeItem(key)
	}
}

export const useLocalStorage = <T, >(key: string, init: T): [T, (v: T) => void]=> {
	const storageItem = localStorage.getItem(key)

	const [ value, setValue ] = useState(
		(storageItem && storageItem !== 'undefined' && JSON.parse(storageItem)) || init
	)
	
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
	}, [key, value])

	return [value, setValue]
}