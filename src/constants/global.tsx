declare global {
	interface Window {
		env: {
			API_ROOT: string
			BASE_NAME: string
		}
	}
}

export const API_URL = window.env?.API_ROOT ?? 'http://localhost:8001'
export const BASE_NAME = window.env?.BASE_NAME