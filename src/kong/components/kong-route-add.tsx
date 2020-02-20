import React, { useState } from 'react'
import styled from 'styled-components'
import { KongServiceDefinition } from 'kong/model/kong-services'
import { useStoreState, useStoreActions } from 'kong/model'
import { onChange, onClick } from 'shared/helpers/event-handlers'

const Name = styled.input`
`
const Priority = styled.input`
	width: 2em;
`
const Path = styled.input`
`
const Method = styled.input`
`
const Actions = styled.div`
`
const ErrorMessage = styled.div`
	grid-column-start: start;
	grid-column-end: span end;
	justify-self: center;
	color: red;
`

export const KongRouteAdd: React.FC = () => {
	const setSelected = useStoreActions(action => action.routes.setSelected)

	const readServices = useStoreState(state=> state.services.resource.read)
	const services: KongServiceDefinition[] = readServices()
	
	const service: KongServiceDefinition = services.find((s) => s.name === 'dev1-api-gateway') ?? services[0]

	const [error, setError] = useState()
	const [name, setName] = useState('')
	const [priority, setPriority] = useState(10)
	const [path, setPath] = useState('/api/')
	const [methods, setMethods] = useState('GET, PUT, POST, DELETE, OPTIONS')
	const [destination, setDestination] = useState(service.id);

	const isDisabled = useStoreState(state => state.routes.resource.isFetching)
	const addRouteAction = useStoreActions(actions => actions.routes.addRoute)

	const changePriority = (p: string) => setPriority(parseInt(p))

	const addRoute = () => {
		setError(null)
		// TODO: validations
		addRouteAction({
			serviceId: destination,
			name,
			priority,
			path,
			methods: methods.toUpperCase().replace(/\s/g, "").split(',')
		})
		.then((response: string) => {
			setSelected(`${response}_0`)
		})
		.catch((error: Error) => {
			setError(error)
		})
	}

	return <>
		<Name name='name' onChange={onChange(setName)} value={name}/>
		<Priority name='priority' onChange={onChange(changePriority)} value={priority}/>
		<Path name='path' onChange={onChange(setPath)} value={path}/>
		<select name='destination' onChange={onChange(setDestination)} value={destination}>
			{services.map(service => (
				<option key={service.id} value={service.id}>{service.name}</option>
			))}
		</select>
		<Method name='methods' onChange={onChange(setMethods)} value={methods}/>
		<Actions>
			<button name='add' onClick={onClick(addRoute)} disabled={isDisabled}>Add</button>
		</Actions>
		<ErrorMessage>{error?.message ?? ' '}</ErrorMessage>
	</>
}