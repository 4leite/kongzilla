import React from 'react'
import { useStoreState, useStoreActions } from 'store'
import styled from 'styled-components'

const Container = styled.div`
	padding: 20px 0px;
	align-items: center;
	justify-content: center;
	text-align: center;
`

export const ControlPanel: React.FunctionComponent = () => {

	const isFetchAllDisabled: boolean = useStoreState(state => state.isFetchingAll)
	const fetchAllAction = useStoreActions(actions => actions.fetchAll)

	return <>
		<Container>
			<button onClick={() => fetchAllAction()} disabled={isFetchAllDisabled}>Reload</button>
		</Container>
	</>
}