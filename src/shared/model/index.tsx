import { Store } from 'easy-peasy';

export interface ZillaStoreModel {
	Interface: React.FC
}

export type ZillaStore = Store<ZillaStoreModel>

export const initialStoreModel: ZillaStoreModel = {
	Interface: () => null
}