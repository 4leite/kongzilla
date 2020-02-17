import { getLottoModel } from 'lotto/model'
import { getKongModel  } from 'kong/model'
import { API_DEFAULT_URL } from 'shared/constants/global'
import { ZillaStoreModel, initialStoreModel } from '.'
import { getApiService } from 'shared/services/api'

interface Environments {
	[key: string]: {
		name: string,
		generateModel: () => ZillaStoreModel
	}
}

export const environments: Environments = {
	initial: {
		name: 'Select an environment',
		generateModel: () => initialStoreModel
	},
	localLotto: {
		name: 'Local Lotto',
		generateModel: () => getLottoModel(getApiService(API_DEFAULT_URL))
	},
	localKong: {
		name: 'Local Kong',
		generateModel: () => getKongModel(getApiService(API_DEFAULT_URL))
	},
	/*dev0: {
		name: 'Dev0',
		Interface: Kong,
		store: createStore(getStoreModel(getApiService(
			'http://mylotto.dev.nzlc.co.nz/_kong'
		)))
	}*/
}
