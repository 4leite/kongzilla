import React, { useState } from 'react'
import styled from 'styled-components'
import { KongServiceDefinition } from 'model/kong-services'
import { useStoreState, useStoreActions } from 'store'

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

const onChange = (setState: (value: any) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
	e.preventDefault()
	setState(e.currentTarget.value)
}

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

	const isDisabled: boolean = useStoreState(state => state.routes.resource.isFetching)
	const addRouteAction = useStoreActions(actions => actions.routes.addRoute)

	const onClick = (e: React.SyntheticEvent) => {
		e.preventDefault()
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
		<Priority name='priority' onChange={onChange(setPriority)} value={priority}/>
		<Path name='path' onChange={onChange(setPath)} value={path}/>
		<select name='destination' onChange={onChange(setDestination)} value={destination}>
			{services.map(service => (
				<option value={service.id}>{service.name}</option>
			))}
		</select>
		<Method name='methods' onChange={onChange(setMethods)} value={methods}/>
		<Actions>
			<button name='add' onClick={onClick} disabled={isDisabled}>Add</button>
		</Actions>
		<ErrorMessage>{error?.message ?? ' '}</ErrorMessage>
	</>
}