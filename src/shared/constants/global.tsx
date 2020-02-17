declare global {
	interface Window {
		env: {
			API_URL: string
		}
	}
}

export const API_DEFAULT_URL = window.env?.API_URL ?? process.env.REACT_APP_API_URL ?? 'http://localhost:8001'