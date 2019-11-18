// export const API_URL = process.env.REACT_APP_API_URL ?? 'http://localhost:8001'
declare global {
	interface Window {
		env: {
			API_ROOT: string
		}
	}
}

export const API_URL = window.env.API_ROOT ?? 'http://localhost'

export const VERSION = process.env.REACT_APP_VERSION

export const NAME = process.env.REACT_APP_NAME