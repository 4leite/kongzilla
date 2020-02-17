import { getStoreModel } from 'lotto/model'
import { API_DEFAULT_URL } from 'shared/constants/global'
import { ZillaStoreModel } from './store'

interface Environments {
	[key: string]: {
		name: string,
		model: ZillaStoreModel
	}
}

export const environments: Environments = {
	initial: {
		name: 'Select an environment',
		model: {
			Interface: () => null
		}
	},
	local: {
		name: 'Local',
		model: getStoreModel(API_DEFAULT_URL)
	},
	/*dev0: {
		name: 'Dev0',
		Interface: Kong,
		store: createStore(getStoreModel(getApiService(
			'http://mylotto.dev.nzlc.co.nz/_kong'
		)))
	}*/
}
