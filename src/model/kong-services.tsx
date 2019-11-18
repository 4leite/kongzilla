import axios from 'axios'

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
		const response = await axios.get<KongServiceResponse>('http://localhost:8001/services')
		
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