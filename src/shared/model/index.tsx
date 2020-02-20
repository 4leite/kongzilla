import { Store, createTypedHooks } from 'easy-peasy';

export type ZillaInterface = React.FC

export interface ZillaStoreModel {
	Interface: ZillaInterface
	columns: string[]
}

export type ZillaStore = Store<ZillaStoreModel>

const typedHooks = createTypedHooks<ZillaStoreModel>()
export const useStoreState = typedHooks.useStoreState

export const initialStoreModel: ZillaStoreModel = {
	Interface: () => null,
	columns: ['']
}