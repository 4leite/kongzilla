declare global {
	interface Window {
		env: {
			API_NAMES: string
			API_TYPES: string
			API_URLS: string
		}
	}
}

const names = (window.env?.API_NAMES ?? process.env.REACT_APP_API_NAMES ?? 'Local').split(',')
const types = (window.env?.API_TYPES ?? process.env.REACT_APP_API_TYPES ?? 'kong').split(',')
const urls = (window.env?.API_URLS ?? process.env.REACT_APP_API_URLS ?? 'http://localhost:8001').split(',')

interface ApiEndPoint {
	name: string
	type: string
	url: string
}

export const API_ENDPOINTS: ApiEndPoint[] = names.map(
	(name, i) => ({
		name,
		type: types[i],
		url: urls[i]
	})
)
