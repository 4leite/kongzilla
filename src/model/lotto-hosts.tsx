import axios, { AxiosResponse } from 'axios'
import { API_URL } from 'constants/global'
import { getSuspendedModel, SuspendedResourceModel } from 'services/suspended-resource'
import { thunk, Thunk } from 'easy-peasy'

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
	data: LottoHostDefinition[]
}


export const getHosts = async () => {
	try {
		const response = await axios.get<LottoHostsResponse>(`${API_URL}/hosts`)
		
		const hosts: LottoHostDefinition[] = response?.data?.data
			?.sort((a, b) => a.name.localeCompare(b.name))
			?.map(
				host => ({
					id: host.id,
					name: host.name
				})
			)
		return hosts ?? []

	} catch (error) {
		console.log('getHosts error')
		throw error
	}
}

export const deleteHost = async (host: LottoHostDefinition) => {
	try {
		return axios.delete(`${API_URL}/hosts/${host.id}`)
	} catch (error) {
		console.log('deleteHost error')
		throw error
	}
}

export const addHost = async (host: AddLottoHostDefinition) => {
	try {
		return await axios.put<AddLottoHostDefinition, AxiosResponse<AddLottoHostResponse>>(`${API_URL}/hosts`, host)
	} catch (error) {
		console.log('addHost error')
		throw error
	}
}

export interface LottoHostsModel {
	resource: SuspendedResourceModel<LottoHostDefinition[]>
	deleteHost: Thunk<LottoHostsModel, LottoHostDefinition>
	addHost: Thunk<LottoHostsModel, AddLottoHostDefinition, Promise<any>>
}

export const hostsModel: LottoHostsModel = { 
	resource: getSuspendedModel<LottoHostDefinition[]>(getHosts),
	deleteHost: thunk(async (actions, payload, {getState}) => {
		actions.resource.fetching(true)

		try {
			await actions.resource.change(deleteHost(payload))
			actions.resource.setResource(await getHosts())
		} catch (error) {
			throw error
		} finally {
			actions.resource.fetching(false)
		}
		// TODO: check for error result
		return payload
	}),
	addHost: thunk(async (actions, payload, {getState}) => {
		const result = await actions.resource.change(addHost(payload))
		return result 
	})
}