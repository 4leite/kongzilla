import React, { useState } from 'react'
import { createStore } from 'easy-peasy'
import { environments } from 'shared/model/enivironments'
import { ZillaStore } from 'shared/model'

interface Props {
	setStore: (store: ZillaStore) => void
  }

export const ControlPanel: React.FC<Props> = (props) => {
	const { setStore } = props

	const [ environment, setEnvironment ] = useState('initial')

	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target
	
		if (environments[value]) {
		  setEnvironment(value)
		  setStore(createStore((environments[value].generateModel())))
		}
	}

	const options = Object.keys(environments).map(e => (
		<option key={e} value={e}>{environments[e].name}</option>
	))

	return <>
		<select value={environment} onChange={onChange}>
        	{options}
      	</select>
	</>
}