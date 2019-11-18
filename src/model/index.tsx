import { routesModel } from 'model/kong-routes'
import { servicesModel } from 'model/kong-services'
import { thunk, Thunk, computed, Computed } from 'easy-peasy'

interface StoreModel {
	routes: typeof routesModel
	services: typeof servicesModel
	isFetchingAll: Computed<StoreModel, boolean>
	fetchAll: Thunk<StoreModel>
}

export const storeModel: StoreModel = {
	routes: routesModel,
	services: servicesModel,
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