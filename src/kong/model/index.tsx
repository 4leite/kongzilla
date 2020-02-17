import { KongRoutesModel, getRoutesModel } from 'kong/model/kong-routes'
import { KongServicesModel, getServicesModel } from 'kong/model/kong-services'
import { thunk, Thunk, computed, Computed, createTypedHooks } from 'easy-peasy'
import { ZillaStoreModel } from 'shared/model'
import { Kong } from 'kong/components'
import { ApiService } from 'shared/services/api'

interface StoreModel extends ZillaStoreModel {
	routes: KongRoutesModel
	services: KongServicesModel
	isFetchingAll: Computed<StoreModel, boolean>
	fetchAll: Thunk<StoreModel>
}

const typedHooks = createTypedHooks<StoreModel>()

// export the typed hooks
export const useStoreActions = typedHooks.useStoreActions
export const useStoreDispatch = typedHooks.useStoreDispatch
export const useStoreState = typedHooks.useStoreState

export const getKongModel = (api: ApiService): StoreModel => ({
	Interface: Kong,
	routes: getRoutesModel(api),
	services: getServicesModel(api),
	isFetchingAll: computed(
		state => (state.routes.resource.isFetching || state.services.resource.isFetching)
	),
	fetchAll: thunk(
		actions => {
			actions.routes.resource.fetch()
			actions.services.resource.fetch()
		}
	)
})
