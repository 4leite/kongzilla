import React from 'react'
import { useStoreState } from 'store'
import styled from 'styled-components'
import { KongService } from 'components/kong/kong-service'

const StyledKongService = styled(KongService)`
`

export const KongServiceList: React.FunctionComponent = () => {

	const services = useStoreState(state => state.services.read)()

	return <>
		{services.map(service => (
			<StyledKongService key={`service-${service.id}`} service={service} />
		))}		
	</>
}