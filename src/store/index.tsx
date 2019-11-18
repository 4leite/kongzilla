import { createStore, createTypedHooks } from 'easy-peasy'
import { storeModel } from 'model'

export const store = createStore(storeModel)

// Provide our model to the helper      👇
const typedHooks = createTypedHooks<typeof storeModel>()

// 👇 export the typed hooks
export const useStoreActions = typedHooks.useStoreActions
export const useStoreDispatch = typedHooks.useStoreDispatch
export const useStoreState = typedHooks.useStoreState