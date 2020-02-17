import { getRoutesModel, LottoRoutesModel } from 'lotto/model/lotto-routes'
import { getHostsModel, LottoHostsModel } from 'lotto/model/lotto-hosts'
import { thunk, Thunk, computed, Computed } from 'easy-peasy'
import { createTypedHooks } from 'easy-peasy'
import { ApiService, getApiService } from 'shared/services/api'
import { Lotto } from 'lotto/components'

interface StoreModel {
	Interface: React.FC
	routes: LottoRoutesModel
	hosts: LottoHostsModel
	isFetchingAll: Computed<StoreModel, boolean>
	fetchAll: Thunk<StoreModel>
}

const typedHooks = createTypedHooks<StoreModel>()

// 👇 export the typed hooks
export const useStoreActions = typedHooks.useStoreActions
export const useStoreDispatch = typedHooks.useStoreDispatch
export const useStoreState = typedHooks.useStoreState

export const getStoreModel = (url: string): StoreModel => {

	const apiService: ApiService = getApiService(url)

	const routes = getRoutesModel(apiService)
	const hosts = getHostsModel(apiService)

	return {
		Interface: Lotto,
		routes,
		hosts,
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
}
