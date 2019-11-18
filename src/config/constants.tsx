declare global {
	interface Window {
		env: {
			API_ROOT: string
		}
	}
}

export const API_URL = window.env?.API_ROOT ?? 'http://localhost'