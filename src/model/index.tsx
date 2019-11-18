import { getSuspendedModel, SuspendedResourceModel } from 'services/suspended-resource'
import { KongRouteDefinition, getRoutes } from 'model/kong-routes'
import { KongServiceDefinition, getServices } from 'model/kong-services'
import { thunk, Thunk, computed, Computed } from 'easy-peasy'

interface StoreModel {
	routes: SuspendedResourceModel<KongRouteDefinition[]>
	services: SuspendedResourceModel<KongServiceDefinition[]>
	isFetchingAll: Computed<StoreModel, boolean>
	fetchAll: Thunk<StoreModel>
}

export const storeModel: StoreModel = {
	routes: getSuspendedModel<KongRouteDefinition[]>(getRoutes),
	services: getSuspendedModel<KongServiceDefinition[]>(getServices),
	isFetchingAll: computed(
		state => (state.routes.isFetching || state.services.isFetching)
	),
	fetchAll: thunk(
		actions => {
			actions.routes.fetch()
			actions.services.fetch()
		}
	)
}