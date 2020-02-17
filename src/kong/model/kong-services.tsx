import { getSuspendedModel, SuspendedResourceModel } from 'shared/services/suspended-resource'
import { ApiService } from 'shared/services/api'

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

export interface KongServicesModel {
	resource: SuspendedResourceModel<KongServiceDefinition[]>
}

export const getServicesModel = (apiService: ApiService) => ({ 
	resource: getSuspendedModel<KongServiceDefinition[]>(async () => {
		const response = await apiService.get<KongServiceResponse>('/services')
			
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
	})
})
