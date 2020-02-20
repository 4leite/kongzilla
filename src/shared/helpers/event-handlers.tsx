export const onChange = (callback: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
	e.preventDefault()
	callback(e.currentTarget.value)
}

export const onClick = (callback: () => void) => (e: React.SyntheticEvent) => {
	e.preventDefault()
	callback()
}