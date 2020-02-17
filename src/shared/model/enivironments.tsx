import { getLottoModel } from 'lotto/model'
import { getKongModel  } from 'kong/model'
import { API_ENDPOINTS } from 'shared/constants/global'
import { ZillaStoreModel, initialStoreModel } from '.'
import { getApiService } from 'shared/services/api'

interface Environment {
	name: string,
	generateModel: () => ZillaStoreModel
}

const endPoints = API_ENDPOINTS.map(e => {
	const { name, type, url } = e

	switch(type) {
		case 'lotto': 
			return {
				name,
				generateModel: () => getLottoModel(getApiService(url)) 
			}
		case 'kong': 
			return {
				name,
				generateModel: () => getKongModel(getApiService(url))
			}
		default:
			console.log(e)
			throw Error('Cannot parse environment type')
	}	
})

export const environments: Environment[] = [{
	name: 'Select an environment',
	generateModel: () => initialStoreModel
}].concat(endPoints)