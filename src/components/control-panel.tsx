import React, { Suspense } from 'react'
import { useStoreState, useStoreActions } from 'store'
import styled from 'styled-components'
import { theme } from 'constants/style'
import { Loading } from 'components/loading'
import { Count } from 'components/count'
import { ErrorBoundary } from './error-boundary'
import { ErrorFallback } from './error-boundary/error-fallback'

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
const StyledFallback = styled(ErrorFallback)`
	margin-top: 20px;
	color: red;
`

export const ControlPanel: React.FunctionComponent = () => {

	const isFetchAllDisabled: boolean = useStoreState(state => state.isFetchingAll)
	const fetchAllAction = useStoreActions(actions => actions.fetchAll)

	return <>
		<Container>
			<button onClick={() => fetchAllAction()} disabled={isFetchAllDisabled}>
				Reload
			</button>
			<ErrorBoundary fallback={StyledFallback}>
				<Suspense fallback={<StyledLoading />}>
					<StyledCount />
				</Suspense>
			</ErrorBoundary>
		</Container>
	</>
}