import axios from 'axios'
import { API_URL } from 'constants/global'
import { getSuspendedModel } from 'services/suspended-resource'

interface KongServiceResponse {
	data: Array<{
		id: string
		name: string
		host: string
	}>
}

export interface KongServiceDefinition {
	name: string
	id: string
}

export const getServices = async () => {
	try {
		const response = await axios.get<KongServiceResponse>(`${API_URL}/services`)
		
		const services: KongServiceDefinition[] = response?.data?.data
			?.filter(service => service.host !== 'apigw.mylotto.co.nz')
			?.sort((a, b) => a.name.localeCompare(b.name))
			?.map(
				service => ({
					id: service.id,
					name: service.name
				})
			)
		return services ?? []

	} catch (error) {
		console.log('getService error')
		throw error
	}
}

export const servicesModel = { 
	resource: getSuspendedModel<KongServiceDefinition[]>(getServices)
}