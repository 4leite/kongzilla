import React, { useState } from 'react'
import styled from 'styled-components'
import { useStoreState, useStoreActions } from 'lotto/model'
import { Method } from 'shared/model/method'
import { Autocomplete } from 'shared/components/autocomplete'
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
/*
const SelectWrapper = styled.div`
	padding-right: 20px;
`
const SelectList = styled.select`
    width: 150px;
	height: 30px;
`
const SelectInput = styled.input`
    width: 130px;
    margin-left: -148px;
    height: 25px;
    border: none;
`
*/
const onChange = (setState: (value: any) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
	e.preventDefault()
	setState(e.currentTarget.value)
}

const onChangeParseInt = (setState: (value: any) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
	e.preventDefault()
	setState(parseInt(e.currentTarget.value))
}
/*
const onChangeCreatable = (setState: (value: any) => void) => (newValue: any, actionMeta: any) => {
	console.log('change host: ', newValue?.value)
	setState(newValue?.value)
};

const onAddCreatable = (setState: (value: any) => void) => (newValue: any, actionMeta: any) => {
	console.log('add host: ', newValue)
	// setState(newValue)
};
*/

export const LottoRouteAdd: React.FC = () => {
	const setSelected = useStoreActions(action => action.routes.setSelected)

	const readHosts = useStoreState(state=> state.hosts.resource.read)
	const hosts = readHosts().map(host => host.name)

	const [error, setError] = useState()
	const [priority, setPriority] = useState(10)
	const [path, setPath] = useState('/api/')
	const [methods, setMethods] = useState('GET, PUT, POST, DELETE')
	const [destination, setDestination] = useState(hosts[0]);
//	const [hostId, setHostId] = useState(0);

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

	return <>
		<Priority name='priority' onChange={onChangeParseInt(setPriority)} value={priority}/>
		<Path name='path' onChange={onChange(setPath)} value={path}/>
		<Autocomplete
			value={destination}
			setValue={setDestination}
			suggestions={hosts}
		/>
{/*
		<SelectWrapper>
			<SelectList value={hostId} onChange={onChange((id: any) => {
					setDestination(hosts[id].name)
					setHostId(id)
			})}>
				{hosts.map((host, index) => (
					<option key={host.id} value={index}>{host.name}</option>
				))}
			</SelectList>
			<SelectInput value={destination} onChange={onChange(setDestination)} name={'aname'} maxLength={5}/>
		</SelectWrapper>
*/}
{/*
		<CreatableSelect 
			isClearable
			name='destination' 
			onChange={onChangeCreatable(setDestination)}
			onInputChange={onAddCreatable(setDestination)}
			options={hosts}
		/>
*/}
		<Methods name='methods' onChange={onChange(setMethods)} value={methods}/>
		<Actions>
			<button name='add' onClick={onClick} disabled={isDisabled}>Add</button>
		</Actions>
		{error && <ErrorMessage>{error.message}</ErrorMessage>}
	</>
}