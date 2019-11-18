import { fakeRouter } from 'services/fake-api'

export type CounterDefinition = number

export const getCounter = async () => {
	const { payload } = await fakeRouter<CounterDefinition>('counter')

	return payload
}