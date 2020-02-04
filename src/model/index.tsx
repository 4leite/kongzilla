import { routesModel } from 'model/lotto-routes'
import { hostsModel } from 'model/lotto-hosts'
import { thunk, Thunk, computed, Computed } from 'easy-peasy'
import { counterModel } from './counter'

interface StoreModel {
	counter: typeof counterModel
	routes: typeof routesModel
	hosts: typeof hostsModel
	isFetchingAll: Computed<StoreModel, boolean>
	fetchAll: Thunk<StoreModel>
}

export const storeModel: StoreModel = {
	counter: counterModel,
	routes: routesModel,
	hosts: hostsModel,
	isFetchingAll: computed(
		state => (state.routes.resource.isFetching || state.hosts.resource.isFetching)
	),
	fetchAll: thunk(
		actions => {
			actions.routes.resource.fetch()
			actions.hosts.resource.fetch()
		}
	)
}