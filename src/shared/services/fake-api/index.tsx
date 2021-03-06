type FetchResponse<T> = { payload: T }
type Fetch = <T, >(url: string, options?: any) => Promise<FetchResponse<T>>

let i: number = -1
const getCount = () => ++i < 2 ? i : i < 3 ? null : undefined
			

const fakeApi = <T, >(payload: any, delay: number): Promise<FetchResponse<T>> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(`respond with ${payload} after ${delay}`)
			if (payload === undefined) {
				reject(Error('No Payload'))
			}
			resolve({ payload })
		}, delay)
	})
}

export const fakeRouter: Fetch = <T, >(url: string, options?: any): Promise<FetchResponse<T>> => {
	console.log(`fetch ${url}`)
	switch(url) {
		case 'counter': return fakeApi<T>(getCount(), 1000)
		case 'null': return fakeApi<T>(null, 3000)
		case 'undefined': return fakeApi<T>(undefined, 3000)
		default: throw Error(`no routing rule for ${url}`)
	} 
}