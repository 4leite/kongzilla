import React, { useState } from 'react'
import styled from 'styled-components'
import { LottoHostDefinition } from 'model/lotto-hosts'
import { useStoreState, useStoreActions } from 'store'
import { Method } from 'model/method'

const Name = styled.input`
`
const Priority = styled.input`
	width: 2em;
`
const Path = styled.input`
`
const Methods = styled.input`
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

const onChangeParseInt = (setState: (value: any) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
	e.preventDefault()
	setState(parseInt(e.currentTarget.value))
}


export const LottoRouteAdd: React.FC = () => {
	const setSelected = useStoreActions(action => action.routes.setSelected)

	const readHosts = useStoreState(state=> state.hosts.resource.read)
	const hosts: LottoHostDefinition[] = readHosts()
	
	const host: LottoHostDefinition = hosts.find((s) => s.name === 'dev1-api-gateway') ?? hosts[0]

	const [error, setError] = useState()
	const [name, setName] = useState('')
	const [priority, setPriority] = useState(10)
	const [path, setPath] = useState('/api/')
	const [methods, setMethods] = useState('GET, PUT, POST, DELETE, OPTIONS')
	const [destination, setDestination] = useState(host.name);

	const isDisabled: boolean = useStoreState(state => state.routes.resource.isFetching)
	const addRouteAction = useStoreActions(actions => actions.routes.addRoute)

	const onClick = (e: React.SyntheticEvent) => {
		e.preventDefault()
		setError(null)
		// TODO: validations
		addRouteAction({
			priority,
			request: {
				methods: methods.toUpperCase().replace(/\s/g, "").split(',') as Method[],
				path
			},
			response: {
				host: destination
			}
		})
		.then((response: string) => {
			setSelected(response)
		})
		.catch((error: Error) => {
			setError(error)
		})
	}

	return <>
		<Name name='name' onChange={onChange(setName)} value={name}/>
		<Priority name='priority' onChange={onChangeParseInt(setPriority)} value={priority}/>
		<Path name='path' onChange={onChange(setPath)} value={path}/>
		<select name='destination' onChange={onChange(setDestination)} value={destination}>
			{hosts.map(host => (
				<option key={host.id} value={host.id}>{host.name}</option>
			))}
		</select>
		<Methods name='methods' onChange={onChange(setMethods)} value={methods}/>
		<Actions>
			<button name='add' onClick={onClick} disabled={isDisabled}>Add</button>
		</Actions>
		<ErrorMessage>{error?.message ?? ' '}</ErrorMessage>
	</>
}