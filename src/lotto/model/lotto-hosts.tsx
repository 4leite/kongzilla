import { getSuspendedModel, SuspendedResourceModel } from 'shared/services/suspended-resource'
import { thunk, Thunk } from 'easy-peasy'
import { ApiService } from 'shared/services/api'

export interface LottoHostDefinition {
	id: string
	name: string
}

interface AddLottoHostDefinition {
	name: string
}

interface AddLottoHostResponse {
	data: LottoHostDefinition
}

interface LottoHostsResponse {
	hosts: LottoHostDefinition[]
}

export interface LottoHostsModel {
	resource: SuspendedResourceModel<LottoHostDefinition[]>
	deleteHost: Thunk<LottoHostsModel, LottoHostDefinition>
	addHost: Thunk<LottoHostsModel, AddLottoHostDefinition, Promise<any>>
}

export const getHostsModel = (apiService: ApiService): LottoHostsModel => ({ 
	resource: getSuspendedModel<LottoHostDefinition[]>(
		async () => {
			const response = await apiService.get<LottoHostsResponse>(`/hosts`)
		
			// TODO: bug in typescript
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			const hosts: LottoHostDefinition[] = response?.data?.hosts
				?.filter((host) => host.name && false)
				?.sort((a, b) => a.name.localeCompare(b.name))
				?.map(
					host => ({
						id: host.id,
						name: host.name
					})
				)
			return hosts ?? []
	}),
	deleteHost: thunk(async (actions, host) => {
		const result = await actions.resource.change(
			() => apiService.delete(`/hosts/${host.id}`)
		)
		// TODO: check for error result
		return result
	}),
	addHost: thunk(async (actions, host) => {
		const result = await actions.resource.change(
			() => apiService.put<AddLottoHostDefinition, AddLottoHostResponse>(`/hosts`, host)
		)
		return result 
	})
})