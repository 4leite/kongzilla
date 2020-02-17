import React, { useState } from 'react'
import styled from 'styled-components'
import { useStoreState, useStoreActions } from 'lotto/model'
import { Method } from 'shared/model/method'
import CreatableSelect from 'react-select/creatable';

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

const onChangeCreatable = (setState: (value: any) => void) => (newValue: any, actionMeta: any) => {
	console.log('change host: ', newValue?.value)
	setState(newValue?.value)
};

const onAddCreatable = (setState: (value: any) => void) => (newValue: any, actionMeta: any) => {
	console.log('add host: ', newValue)
	// setState(newValue)
};

export const LottoRouteAdd: React.FC = () => {
	const setSelected = useStoreActions(action => action.routes.setSelected)

	const readHosts = useStoreState(state=> state.hosts.resource.read)

	const hosts = readHosts().map(host => (
		{value: host.name, label: host.name}
	))

	const [error, setError] = useState()
	const [priority, setPriority] = useState(10)
	const [path, setPath] = useState('/api/')
	const [methods, setMethods] = useState('GET, PUT, POST, DELETE')
	const [destination, setDestination] = useState(null);

	const isDisabled: boolean = useStoreState(state => state.routes.resource.isFetching)
	const addRouteAction = useStoreActions(actions => actions.routes.addRoute)

	const onClick = (e: React.SyntheticEvent) => {
		e.preventDefault()
		setError(null)
		
		// TODO: better validations
		if (!destination) {
			setError(Error('Please select a destination'))
			return
		}

		addRouteAction({
			priority,
			request: {
				methods: methods.toUpperCase().replace(/\s/g, "").split(',').filter(Boolean) as Method[],
				path
			},
			response: {
				// how to tell typescript I've checked for null above?
				host: destination ?? ''
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
		<Priority name='priority' onChange={onChangeParseInt(setPriority)} value={priority}/>
		<Path name='path' onChange={onChange(setPath)} value={path}/>
		<CreatableSelect 
			isClearable
			name='destination' 
			onChange={onChangeCreatable(setDestination)}
			onInputChange={onAddCreatable(setDestination)}
			options={hosts}
		/>
		<Methods name='methods' onChange={onChange(setMethods)} value={methods}/>
		<Actions>
			<button name='add' onClick={onClick} disabled={isDisabled}>Add</button>
		</Actions>
		{error && <ErrorMessage>{error.message}</ErrorMessage>}
	</>
}