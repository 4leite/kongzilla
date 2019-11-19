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
	title: string
	name: string
	id: string
}

export const getServices = async () => {
	try {
		console.log(API_URL)
		const response = await axios.get<KongServiceResponse>(`${API_URL}/services`)
		
		const services: KongServiceDefinition[] = response?.data?.data
			?.filter(service => service.host !== 'apigw.mylotto.co.nz')
			?.map(
				service => ({
					id: service.id,
					name: service.name,
					title: service.name
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