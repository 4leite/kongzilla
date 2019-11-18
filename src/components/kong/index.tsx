import React, { Suspense } from 'react'
import { Loading } from 'components/loading'
import { ErrorBoundary } from 'components/error-boundary'
import { KongServiceList } from 'components/kong/kong-service-list'
import styled from 'styled-components'

const KongContainer = styled.div`
	background-color: #dddddd;
	display: grid;
	grid-template-columns: [k-l] auto [k-mid-l] auto [k-mid-r] auto [k-r];
	grid-gap: 10px 10px;
	padding: 20px 10px;
	align-content: start;
	justify-content: center;
`

export const Kong: React.FunctionComponent = () => 
<>
	<KongContainer>
		<ErrorBoundary>
			<Suspense fallback={<Loading />}>
				<KongServiceList/>
			</Suspense>
		</ErrorBoundary>
	</KongContainer>
</>
