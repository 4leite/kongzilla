import React, { Suspense, useState } from 'react'
import styled from 'styled-components'
import { theme } from 'constants/style'
import { Loading } from 'components/loading'
import { ErrorBoundary } from './error'
import { KongRouteCheck } from './kong/kong-route-check'

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
const StyledErrorBoundary = styled(ErrorBoundary)`
	margin-top: 20px;
	color: red;
`
const StyledKongRouteCheck = styled(KongRouteCheck)`
	margin-left: 20px;
`

const onChange = (setState: (value: any) => void) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
	e.preventDefault()
	setState(e.currentTarget.value)
}

export const ControlPanel: React.FC = () => {
	const [path, setPath] = useState('/api/')

	return <>
		<Container>
			<input name='path' onChange={onChange(setPath)} value={path}/>
			<StyledErrorBoundary >
				<Suspense fallback={<StyledLoading />}>
					<StyledKongRouteCheck path={path} />
				</Suspense>
			</StyledErrorBoundary>
		</Container>
	</>
}