import { getSuspendedModel, SuspendedResourceModel } from 'shared/services/suspended-resource'
import { Thunk, thunk, Action, action } from 'easy-peasy'
import { Method } from '../../shared/model/method'
import { ApiService } from 'shared/services/api'

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
	isDisabled?: boolean
}

export interface LottoRoutesModel {
	resource: SuspendedResourceModel<LottoRouteDefinition[]>
	deleteRoute: Thunk<LottoRoutesModel, LottoRouteDefinition>
	addRoute: Thunk<LottoRoutesModel, addLottoRouteDefinition>
	selectedKey: string | null
	setSelected: Action<LottoRoutesModel, string | null>
}

export const getRoutesModel = (apiService: ApiService): LottoRoutesModel => ({
	resource: getSuspendedModel<LottoRouteDefinition[]>(
		async () => {
			const result = await apiService.get<getLottoRoutesPayload>(`/routes`)	
			return result?.data?.routes
	}),
	deleteRoute: thunk(async (actions, route) => {
		const result = await actions.resource.change(
			() => apiService.delete(`/routes/${route.id}`)
		)
		actions.setSelected(null)
		return result
	}),
	addRoute: thunk(async (actions, route) => {
		const id = await actions.resource.change(
			() => apiService.post<addLottoRouteDefinition, LottoRouteResponse>(`/routes`, route)
		)
		actions.setSelected(id)
		return id
	}),
	selectedKey: null,
	setSelected: action((state, routeKey) => {
		state.selectedKey = routeKey ?? null
	})
})