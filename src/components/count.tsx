import React from 'react'
import { useStoreState } from 'store'

interface Props {
	className?: string
}

export const Count: React.FunctionComponent<Props> = (props) => {
	const { className } = props

	const readCount = useStoreState(state => state.counter.resource.read)

	return <>
		<div className={className}>{readCount()}</div>
	</>
}