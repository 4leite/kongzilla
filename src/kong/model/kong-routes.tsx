import { getSuspendedModel, SuspendedResourceModel } from 'shared/services/suspended-resource'
import { Thunk, thunk, Action, action } from 'easy-peasy'
import { ApiService } from 'shared/services/api'

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

export const getRoutesModel = (apiService: ApiService): KongRoutesModel => ({
	resource: getSuspendedModel<KongRouteDefinition[]>(async () => {
		const response = await apiService.get<getRoutesPayload>('/routes')

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
	}),
	deleteRoute: thunk(async (actions, route) => {
		await actions.resource.change(
			() => apiService.delete(`/routes/${route.id}`)
		)
		// TODO: check for error result
		actions.setSelected(null)
		return route
	}),
	addRoute: thunk(async (actions, route) => {
		const response = await actions.resource.change(async () => {
			const payload: addRoutePayload = transformAddKongRouteToPayload(route)

			return apiService.post<addRoutePayload, addRouteResponse>('/routes', payload)
		})
		const { id } = response?.data
		actions.setSelected(`${id}_0`)
		return id
	}),
	selectedKey: null,
	setSelected: action((state, routeKey) => {
		state.selectedKey = routeKey ?? null
	})
})