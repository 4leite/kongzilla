import { Action, Thunk, action, thunk } from 'easy-peasy'

export interface SuspendedResourceModel<T> {
	isFetching: boolean
	read: () => T
	postfetch: Action<SuspendedResourceModel<T>>
  	prefetch: Action<SuspendedResourceModel<T>, () => T>
	fetch: Thunk<SuspendedResourceModel<T>>
}

type FetchStatus = 'pending' | 'success' | 'error'
type SuspendedResource<T> = () => T

/* 
 * Returns a suspense object
 */
const simpleSuspendedFetch = <T, >(promise: Promise<T>): SuspendedResource<T> => {
	let status: FetchStatus = 'pending'
	let result: T
	let suspender = promise.then(
		r => {
			status = 'success'
			result = r
		},
		e => {
			status = 'error'
			result = e
		}
	)
	return () => {
		switch (status) {
			case 'pending': throw suspender
			case 'success': return result
			case 'error': throw result
		}
	}
}

export const getSuspendedModel = <T, >(fetch: () => Promise<T>): SuspendedResourceModel<T> => ({
	isFetching: false,
	read: simpleSuspendedFetch<T>(fetch()),
	prefetch: action((state, payload) => {
		state.isFetching = true
		state.read = payload
	}),
	postfetch: action(state => {
		state.isFetching = false
	}),
	fetch: thunk(async (actions, payload, {getState}) => {
		try {
			getState().read()
			const suspender = simpleSuspendedFetch<T>(fetch())
			actions.prefetch(suspender)
			try {
				suspender()
			} catch (suspender) {
				await suspender
			} finally {
				actions.postfetch()
			}
		} catch (suspender) {
			// Let the next accessor catch the error
		}
	})
})

