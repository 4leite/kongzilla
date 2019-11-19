import { fakeRouter } from 'services/fake-api'
import { getSuspendedModel } from 'services/suspended-resource'

export type CounterDefinition = number

export const getCounter = async () => {
	const { payload } = await fakeRouter<CounterDefinition>('counter')

	return payload
}

export const counterModel = { 
	resource: getSuspendedModel<CounterDefinition>(getCounter)
}