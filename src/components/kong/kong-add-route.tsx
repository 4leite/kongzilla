import React, { useState } from 'react'
import styled from 'styled-components'
import { KongServiceDefinition } from 'model/kong-services'
import { useStoreState, useStoreActions } from 'store'

interface Props {
	service: KongServiceDefinition
}

const Name = styled.input`
	grid-column-start: a1;
	grid-column-end: b1;
`
const Priority = styled.input`
	grid-column-start: b1;
	grid-column-end: c1;
	width: 2em;
`
const Path = styled.input`
	grid-column-start: c1;
	grid-column-end: d1;
`
const Method = styled.input`
	grid-column-start: d1;
	grid-column-end: e1;
`
const Actions = styled.div`
	grid-column-start: e1;
	grid-column-end: f1;
`
const ErrorMessage = styled.div`
	grid-column-start: start;
	grid-column-end: span end;
	justify-self: center;
	color: red;
`

const onChange = (setState: (value: any) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
	e.preventDefault()
	setState(e.currentTarget.value)
}

export const KongAddRoute: React.FunctionComponent<Props> = props => {
	const { service } = props

	const [error, setError] = useState()
	const [name, setName] = useState()
	const [priority, setPriority] = useState(10)
	const [path, setPath] = useState('/api/')
	const [methods, setMethods] = useState('GET, PUT, POST, DELETE, OPTIONS')

	const isDisabled: boolean = useStoreState(state => state.routes.resource.isFetching)
	const addRouteAction = useStoreActions(actions => actions.routes.addRoute)

	const onClick = (e: React.SyntheticEvent) => {
		e.preventDefault()
		setError(null)
		// TODO: validations
		addRouteAction({
			service,
			name,
			priority,
			path,
			methods: methods.toUpperCase().replace(/\s/g, "").split(',')
		}).catch((error: Error) => {
			setError(error)
		})
	}

	return <>
		<Name name='name' onChange={onChange(setName)} value={name}/>
		<Priority name='priority' onChange={onChange(setPriority)} value={priority}/>
		<Path name='path' onChange={onChange(setPath)} value={path}/>
		<Method name='methods' onChange={onChange(setMethods)} value={methods}/>
		<Actions>
			<button name='add' onClick={onClick} disabled={isDisabled}>Add</button>
		</Actions>
		<ErrorMessage>{error?.message ?? ' '}</ErrorMessage>
	</>
}