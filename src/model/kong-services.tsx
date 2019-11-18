import axios from 'axios'
import { API_URL } from 'config/constants'

interface KongServiceResponse {
	data: Array<{
		id: string
		name: string
		host: string
	}>
}

export interface KongServiceDefinition {
	title: string
	id: string
}

export const getServices = async () => {
	try {
		console.log(API_URL)
		const response = await axios.get<KongServiceResponse>(`${API_URL}/services`)
		
		const services: KongServiceDefinition[] = response?.data?.data?.map(
			service => ({
				id: service.id,
				title: service.host
			})
		)

		return services ?? []

	} catch (error) {
		console.log('getService error')
		throw error
	}
}