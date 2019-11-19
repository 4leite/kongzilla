import React, { Suspense } from 'react'
import { Loading } from 'components/loading'
import { ErrorBoundary } from 'components/error-boundary'
import { KongServiceList } from 'components/kong/kong-service-list'
import styled from 'styled-components'
import { theme } from 'constants/style'

const Container = styled.div`
	background-color: ${theme.page.background};
	color: ${theme.page.color};  
	display: grid;
	grid-template-columns: [start a1] auto [b1] auto [c1] auto [d1] auto [e1] auto [f1 end];
	grid-gap: 10px 10px;
	padding: 20px 10px;
	align-content: start;
	justify-content: center;
`
// grid-template-columns: [a] auto [b] auto [c] auto [d] auto [e];
// grid-template-columns: [service-l] auto auto auto auto [service-r]
// grid-template-columns: [service-l priority-l] auto [priority-r path-l] auto [path-r methods-l] auto [methods-r actions-l] auto [actions-r service-r];

export const Kong: React.FunctionComponent = () => 
<>
	<Container>
		<ErrorBoundary>
			<Suspense fallback={<Loading />}>
				<KongServiceList/>
			</Suspense>
		</ErrorBoundary>
	</Container>
</>
