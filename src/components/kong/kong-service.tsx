import React, { Suspense} from 'react'
import { KongRouteList } from 'components/kong/kong-route-list'
import { Loading } from 'components/loading'
import { KongServiceDefinition } from 'model/kong-services'
import styled from 'styled-components'
import { KongAddRoute } from './kong-add-route'
import { ErrorBoundary } from 'components/error-boundary'

interface Props {
	service: KongServiceDefinition
}

const ServiceName = styled.div`
	padding-top: 20px;
	padding-bottom: 10px;
	grid-column-start: start;
	grid-column-end: span end;
	justify-self: center;
`

const StyledErrorBoundary = styled(ErrorBoundary)`
	padding-top: 20px;
	padding-bottom: 10px;
	grid-column-start: start;
	grid-column-end: span end;
	justify-self: center;
	color: red;
`

export const KongService: React.FunctionComponent<Props> = props => {
	const { service } = props

	return <>
		<ServiceName><strong>{service?.title}</strong></ServiceName>
		<KongAddRoute service={service} />
		<StyledErrorBoundary>
			<Suspense fallback={<Loading />}>
				<KongRouteList service={service} />
			</Suspense>
		</StyledErrorBoundary>
	</>
}