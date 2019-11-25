import axios, { AxiosResponse } from 'axios'
import { API_URL } from 'constants/global'
import { getSuspendedModel, SuspendedResourceModel } from 'services/suspended-resource'
import { Thunk, thunk, Action, action } from 'easy-peasy'

interface getRoutesPayload {
	data: Array<{
		id: string
		name: string
		protocols: string[]
		methods: string[]
		hosts: string[]
		paths: string[]
		regex_priority: number
		strip_path: boolean
		preserve_host: boolean
		created_at: Date
		service: {
			id: string
		}
	}>
}
interface addRoutePayload {
	name: string,
	protocols: string[],
	methods: string[],
	hosts: string[],
	paths: string[],
	regex_priority: number,
	strip_path: false,
	preserve_host: false,
	service: {
		id: string
	}
}

interface addRouteResponse {
	id: string
}
interface addKongRouteDefinition {
	name: string
	path: string
	methods: string[]
	priority: number
	serviceId: string
}

export interface KongRouteDefinition {
	id: string
	key: string // unique
	name: string
	path: string
	methods: string[]
	priority: number
	created: Date
	serviceId: string
	serviceName?: string
	isDeleted?: boolean
}

const getRoutes = async (): Promise<KongRouteDefinition[]> => {
	try {
		const response = await axios.get<getRoutesPayload>(`${API_URL}/routes`)

		// Map each route's paths as separate routes 
		const nestedRoutesArray = response?.data?.data?.map(
			route => route.paths?.map(
				(path, index) => ({
					id: route.id,
					key: `${route.id}_${index}`,
					path: path,
					methods: route.methods,
					priority: route.regex_priority,
					created: route.created_at,
					serviceId: route.service.id,
					name: route.name
				})
			)
		)
		// Check we have some routes; flatten the array of arrays
		return nestedRoutesArray && Array.prototype.concat(...nestedRoutesArray)

	} catch (error) {
		console.log('getService error')
		throw error
	}
}

const addRoute = async (route: addKongRouteDefinition): Promise<string> => {

	try {
		const payload: addRoutePayload = transformAddKongRouteToPayload(route)

		const response = await axios.post<addRoutePayload, AxiosResponse<addRouteResponse>>(`${API_URL}/routes`, payload)

		return response?.data?.id
	} 
	catch (error) {
		console.log('addRoute error')
		throw error
	}
}

const deleteRoute = async (route: KongRouteDefinition) => {
	try {
		return axios.delete(`${API_URL}/routes/${route.id}`)
	} catch (error) {
		console.log('deleteRoute error')
		throw error
	}	
}

const transformAddKongRouteToPayload = (route: addKongRouteDefinition): addRoutePayload => ({
	name: route.name,
	protocols: [ 'http' ],
	methods: route.methods,
	hosts: [ 'mylotto.dev.nzlc.co.nz' ],
	paths: [ route.path ],
	regex_priority: route.priority,
	strip_path: false,
	preserve_host: false,
	service: {
		id: route.serviceId
	}
})

export const exportRoute = (route: KongRouteDefinition): string => {
	const json = {
		name: route.name,
		protocols: [ 'http' ],
		methods: route.methods,
		hosts: [ 'mylotto.dev.nzlc.co.nz' ],
		paths: [ route.path ],
		regex_priority: route.priority,
		strip_path: false,
		preserve_host: false,
		service: {
			name: route.serviceName ?? ''
		}
	}
	return JSON.stringify(json, null, 1)
}

export interface KongRoutesModel {
	resource: SuspendedResourceModel<KongRouteDefinition[]>
	deleteRoute: Thunk<KongRoutesModel, KongRouteDefinition>
	addRoute: Thunk<KongRoutesModel, addKongRouteDefinition, Promise<any>>
	selectedKey: string | null
	setSelected: Action<KongRoutesModel, string | null>
}

export const routesModel: KongRoutesModel = {
	resource: getSuspendedModel<KongRouteDefinition[]>(getRoutes),
	deleteRoute: thunk(async (actions, payload, {getState}) => {
		actions.resource.fetching(true)

		try {
			await deleteRoute(payload)
			const routes = getState().resource.read() 
			const route = routes.find(r => r.id === payload.id)
			if (route) {route.isDeleted = true}
			actions.resource.setResource(routes)
		} catch (error) {
			throw error
		} finally {
			actions.resource.fetching(false)
		}
		// actions.setSelected(null)
		// TODO: check for error result
		return payload
	}),
	addRoute: thunk(async (actions, payload) => {
		const result = await actions.resource.change(addRoute(payload))
		actions.setSelected(`${result}.id_0`)
		return result 
	}),
	selectedKey: null,
	setSelected: action((state, routeKey) => {
		state.selectedKey = routeKey ?? null
	})
}