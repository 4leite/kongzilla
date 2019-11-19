import React from 'react'
import { useStoreState } from 'store'
import { KongService } from 'components/kong/kong-service'

export const KongServiceList: React.FunctionComponent = () => {

	const services = useStoreState(state => state.services.resource.read)()

	return <>
		{services.map(service => (
			<KongService key={`service-${service.id}`} service={service} />
		))}		
	</>
}