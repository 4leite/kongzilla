import { Action, Thunk, action, thunk } from 'easy-peasy'

export interface SuspendedResourceModel<T> {
	isFetching: boolean
	read: () => T
	fetching: Action<SuspendedResourceModel<T>, boolean>
  	setSuspender: Action<SuspendedResourceModel<T>, () => T>
	setResource: Action<SuspendedResourceModel<T>, T>
	fetch: Thunk<SuspendedResourceModel<T>>
	suspendedFetch: Thunk<SuspendedResourceModel<T>>
	change: Thunk<SuspendedResourceModel<T>, Promise<any>>
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
	fetching: action((state, payload) => {
		state.isFetching = payload
	}),
	setSuspender: action((state, payload) => {
		state.read = payload
	}),
	setResource: action((state, payload) => {
		state.read = () => payload
	}),
	suspendedFetch: thunk(async (actions, payload, {getState}) => {
		try {
			getState().read()
			actions.fetching(true)
			const suspender = simpleSuspendedFetch<T>(fetch())
			actions.setSuspender(suspender)
			try {
				suspender()
			} catch (suspender) {
				await suspender
			} finally {
				actions.fetching(false)
			}
		} catch (suspender) {
			// Let the next accessor catch the error
		}
	}),
	fetch: thunk(async (actions, payload, {getState}) => {
		try {
			getState().read()
			actions.fetching(true)
			try {
				actions.setResource(await fetch())
			} catch (error) {
				actions.setSuspender(() => {throw error})
			}
			actions.fetching(false)
		
		} catch (suspender) {
			// Let the next accessor catch the error
		}
	}),
	change: thunk(async (actions, payload) => {
		actions.fetching(true)
		let result
		try {
			result = await payload
			actions.setResource(await fetch())
		} catch (error) {
			throw error
		} finally {
			actions.fetching(false)
		}
		return result
	})
})

