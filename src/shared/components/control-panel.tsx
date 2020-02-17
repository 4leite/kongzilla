import React, { useState } from 'react'
import { createStore } from 'easy-peasy'
import { environments } from 'shared/model/enivironments'
import { ZillaStore } from 'shared/model'

interface Props {
	setStore: (store: ZillaStore) => void
  }

export const ControlPanel: React.FC<Props> = (props) => {
	const { setStore } = props

	const [ index, setIndex ] = useState(0)

	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const i: number = parseInt(e.target.value)
	
		if (environments[i]) {
		  setIndex(i)
		  setStore(createStore((environments[i].generateModel())))
		}
	}

	const options = environments.map((e, i) => (
		<option key={i} value={i}>{e.name}</option>
	))

	return <>
		<select value={index} onChange={onChange}>
        	{options}
      	</select>
	</>
}