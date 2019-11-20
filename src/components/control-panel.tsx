import React, { Suspense } from 'react'
import { useStoreState, useStoreActions } from 'store'
import styled from 'styled-components'
import { theme } from 'constants/style'
import { Loading } from 'components/loading'
import { Count } from 'components/count'
import { ErrorBoundary } from './error'

const Container = styled.div`
	background-color: ${theme.toolbar.background};
	color: ${theme.toolbar.color};
	padding: 20px 0px;
	align-items: center;
	justify-content: center;
	text-align: center;
`
const StyledLoading = styled(Loading)`
	display: inline;
	margin-left: 20px;
`
const StyledCount = styled(Count)`
	display: inline;
	margin-left: 20px;
`
const StyledErrorBoundary = styled(ErrorBoundary)`
	margin-top: 20px;
	color: red;
`

export const ControlPanel: React.FC = () => {

	const isFetchAllDisabled: boolean = useStoreState(state => state.isFetchingAll)
	const fetchAllAction = useStoreActions(actions => actions.fetchAll)

	const onClick = () => fetchAllAction()

	return <>
		<Container>
			<button onClick={onClick} disabled={isFetchAllDisabled}>
				Reload
			</button>
			<StyledErrorBoundary >
				<Suspense fallback={<StyledLoading />}>
					<StyledCount />
				</Suspense>
			</StyledErrorBoundary>
		</Container>
	</>
}