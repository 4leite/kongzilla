import { routesModel } from 'model/kong-routes'
import { servicesModel } from 'model/kong-services'
import { thunk, Thunk, computed, Computed } from 'easy-peasy'
import { counterModel } from './counter'

interface StoreModel {
	counter: typeof counterModel
	routes: typeof routesModel
	services: typeof servicesModel
	isFetchingAll: Computed<StoreModel, boolean>
	fetchAll: Thunk<StoreModel>
}

export const storeModel: StoreModel = {
	counter: counterModel,
	routes: routesModel,
	services: servicesModel,
	isFetchingAll: computed(
		state => (state.routes.resource.isFetching || state.services.resource.isFetching || state.counter.resource.isFetching)
	),
	fetchAll: thunk(
		actions => {
			actions.counter.resource.suspendedFetch()
			actions.routes.resource.fetch()
			actions.services.resource.fetch()
		}
	)
}