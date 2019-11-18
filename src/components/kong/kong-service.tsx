import React, { Suspense} from 'react'
import { KongRouteList } from 'components/kong/kong-route-list'
import { Loading } from 'components/loading'
import { KongServiceDefinition } from 'model/kong-services'
import styled from 'styled-components'

interface Props {
	service: KongServiceDefinition
}

const ServiceHeader = styled.div`
	padding-top: 20px;
	padding-bottom: 10px;
	grid-column-start: k-l;
	grid-column-end: span k-r;
`

export const KongService: React.FunctionComponent<Props> = props => {
	const { service } = props

	return <>
		<ServiceHeader><strong>{service?.title}</strong></ServiceHeader>
		<Suspense fallback={<Loading />}>
			<KongRouteList service={service} />
		</Suspense>
	</>
}