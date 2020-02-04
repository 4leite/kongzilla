import axios, { AxiosResponse } from 'axios'
import { API_URL } from 'constants/global'
import { getSuspendedModel, SuspendedResourceModel } from 'services/suspended-resource'
import { Thunk, thunk, Action, action } from 'easy-peasy'
import { Method } from './method'

interface LottoRouteResponse {
	priority: number,
    request: {
		methods: Method[],
		path: string,
    },
    response: {
		host: string
    },
	id: string
}

interface getLottoRoutesPayload {
	routes: LottoRouteResponse[]
}

interface addLottoRouteDefinition {
	priority: number,
	request: {
		methods: Method[],
		path: string,
	},
	response: {
		host: string
	}
}

export interface LottoRouteDefinition {
	priority: number,
    request: {
		methods: Method[],
		path: string,
    },
    response: {
		host: string
    },
	id: string
	isDeleted?: boolean
}

const getRoutes = async (): Promise<LottoRouteDefinition[]> => {
	try {
		const result = await axios.get<getLottoRoutesPayload>(`${API_URL}/routes`)
		return result?.data?.routes

	} catch (error) {
		console.log('getService error')
		throw error
	}
}

const addRoute = async (route: addLottoRouteDefinition): Promise<string> => {
	try {
		const response = await axios.post<addLottoRouteDefinition, AxiosResponse<LottoRouteResponse>>(`${API_URL}/routes`, route)
		return response?.data?.id
	} 
	catch (error) {
		console.log('addRoute error')
		throw error
	}
}

const deleteRoute = async (route: LottoRouteDefinition) => {
	try {
		return axios.delete(`${API_URL}/routes/${route.id}`)
	} catch (error) {
		console.log('deleteRoute error')
		throw error
	}	
}

export interface LottoRoutesModel {
	resource: SuspendedResourceModel<LottoRouteDefinition[]>
	deleteRoute: Thunk<LottoRoutesModel, LottoRouteDefinition>
	addRoute: Thunk<LottoRoutesModel, addLottoRouteDefinition, Promise<any>>
	selectedKey: string | null
	setSelected: Action<LottoRoutesModel, string | null>
}

export const routesModel: LottoRoutesModel = {
	resource: getSuspendedModel<LottoRouteDefinition[]>(getRoutes),
	deleteRoute: thunk(async (actions, payload, {getState}) => {
		const result = await actions.resource.change(deleteRoute(payload))
		actions.setSelected(null)
		return result
	}),
	addRoute: thunk(async (actions, payload) => {
		const result = await actions.resource.change(addRoute(payload))
		actions.setSelected(result)
		return result 
	}),
	selectedKey: null,
	setSelected: action((state, routeKey) => {
		state.selectedKey = routeKey ?? null
	})
}