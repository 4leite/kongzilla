import axios from 'axios'
import { API_URL } from 'config/constants'
import { getSuspendedModel } from 'services/suspended-resource'

interface KongRouteResponse {
	data: Array<{
		id: string
		paths: string[]
		methods: string[]
		regex_priority: number
		service: {
			id: string
		}
	}>
}

const getRoutes = async () => {
	try {
		const response = await axios.get<KongRouteResponse>(`${API_URL}/routes`)

		// Map each route's paths as separate routes 
		const nestedRoutesArray = response?.data?.data?.map(
			route => route.paths?.map(
				(path, index) => ({
					id: `${route.id}_${index}`,
					path: path,
					methods: route.methods,
					priority: route.regex_priority,
					service: route.service.id
				})
			)
		)
		// Check we have some routes; flatten the array of arrays
		return nestedRoutesArray && Array.prototype.concat(...nestedRoutesArray)			
	} catch (error) {
		console.log('getService error')
		throw error
	}
}

export interface KongRouteDefinition {
	id: string
	path: string
	methods: string[]
	priority: number
	service: string
}

export const routesModel = getSuspendedModel<KongRouteDefinition[]>(getRoutes)
