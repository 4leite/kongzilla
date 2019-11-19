import axios from 'axios'
import { API_URL } from 'constants/global'
import { getSuspendedModel, SuspendedResourceModel } from 'services/suspended-resource'
import { Thunk, thunk } from 'easy-peasy'
import { KongServiceDefinition } from './kong-services'

interface KongRoutePayload {
	id?: string
	name: string
	protocols: string[]
	methods: string[]
	hosts: string[]
	paths: string[]
	regex_priority: number
	strip_path: boolean
	preserve_host: boolean
	service: {
		name: string
		id: string
	}
}

interface KongRouteResponse {
	data: KongRoutePayload[]
}

export interface KongRouteDefinition {
	id?: string
	key?: string // unique
	name: string
	path: string
	methods: string[]
	priority: number
	service: KongServiceDefinition
}

export interface KongRoutesModel {
	resource: SuspendedResourceModel<KongRouteDefinition[]>
	deleteRoute: Thunk<KongRoutesModel, KongRouteDefinition>
	addRoute: Thunk<KongRoutesModel, KongRouteDefinition, Promise<any>>
}

export const addRoute = async (route: KongRouteDefinition) => {
	const response = await axios.post(`${API_URL}/routes`,{
		name: route.name,
		protocols: [ 'http' ],
		methods: route.methods,
		hosts: [ 'mylotto.dev.nzlc.co.nz' ],
		paths: [ route.path ],
		regex_priority: route.priority,
		strip_path: false,
		preserve_host: false,
		service: {
			name: route.service.name,
			id: route.service.id
		}
	})
	return response
}

export const deleteRoute = async (route: KongRouteDefinition) => {
	try {
		return axios.delete<KongRouteResponse>(`${API_URL}/routes/${route.id}`)
	} catch (error) {
		console.log('deleteRoute error')
		throw error
	}	
}

export const getRoutes = async () => {
	try {
		const response = await axios.get<KongRouteResponse>(`${API_URL}/routes`)

		// Map each route's paths as separate routes 
		const nestedRoutesArray = response?.data?.data?.map(
			route => route.paths?.map(
				(path, index) => ({
					id: route.id,
					key: `${route.id}_${index}`,
					path: path,
					methods: route.methods,
					priority: route.regex_priority,
					service: {
						id: route.service.id,
						name: route.service.name
					},
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

export const routesModel: KongRoutesModel = {
	resource: getSuspendedModel<KongRouteDefinition[]>(getRoutes),
	deleteRoute: thunk(async (actions, payload) => {
		await actions.resource.change(deleteRoute(payload))
	}),
	addRoute: thunk(async (actions, payload) => {
		await actions.resource.change(addRoute(payload))
	})
}

