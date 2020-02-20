import React, { useState } from 'react'
import styled from 'styled-components'
import { useStoreState, useStoreActions } from 'lotto/model'
import { Method } from 'shared/model/method'
import { Autocomplete } from 'shared/components/autocomplete'
import { onChange } from 'shared/helpers/event-handlers'
// import CreatableSelect from 'react-select/creatable';

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

export const LottoRouteAdd: React.FC = () => {
	const setSelected = useStoreActions(action => action.routes.setSelected)

	const readHosts = useStoreState(state=> state.hosts.resource.read)
	const hosts = readHosts().map(host => host.name)

	const [error, setError] = useState()
	const [priority, setPriority] = useState(10)
	const [path, setPath] = useState('/api/')
	const [methods, setMethods] = useState('GET, PUT, POST, DELETE')
	const [destination, setDestination] = useState(hosts[0]);

	const isDisabled: boolean = useStoreState(state => state.routes.resource.isFetching)
	const addRouteAction = useStoreActions(actions => actions.routes.addRoute)
	const updateHosts = useStoreActions(actions => actions.hosts.resource.fetch)

	const onClick = (e: React.SyntheticEvent) => {
		e.preventDefault()
		setError(null)
		
		// TODO: better validations
		addRouteAction({
			priority,
			request: {
				methods: methods.toUpperCase().replace(/\s/g, "").split(',').filter(Boolean) as Method[],
				path
			},
			response: {
				host: destination
			}
		})
		.then((response: string) => {
			updateHosts()
			setSelected(response)
		})
		.catch((error: Error) => {
			setError(error)
		})
	}

	const changePriority = (p: string) => setPriority(parseInt(p))

	return <>
		<Priority name='priority' onChange={onChange(changePriority)} value={priority}/>
		<Path name='path' onChange={onChange(setPath)} value={path}/>
		<Autocomplete
			value={destination}
			setValue={setDestination}
			suggestions={hosts}
		/>
		<Methods name='methods' onChange={onChange(setMethods)} value={methods}/>
		<Actions>
			<button name='add' onClick={onClick} disabled={isDisabled}>Add</button>
		</Actions>
		{error && <ErrorMessage>{error.message}</ErrorMessage>}
	</>
}