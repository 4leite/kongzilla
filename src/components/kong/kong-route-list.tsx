import React, { useMemo } from 'react'
import { KongServiceDefinition } from 'model/kong-services'
import { KongRoute } from 'components/kong/kong-route'
import { useStoreState } from 'store'
import styled from 'styled-components'

interface Props {
	service: KongServiceDefinition
}

const StyledKongRoute = styled(KongRoute)`
`

export const KongRouteList: React.FunctionComponent<Props> = props => {

	const { service } = props

	const routes = useStoreState(state => state.routes.read)()

	const sortedRoutes = useMemo(() => routes
		.filter(route => (route.service === service.id))
		.sort((a, b) => {
			if (a.priority > b.priority) {
				return -1
			}
			if (a.priority < b.priority) {
				return 1
			}
			return a.path.localeCompare(b.path)
		}), [routes, service])
	
	return <>
		{sortedRoutes.map(
			route => <StyledKongRoute key={`route-${route.id}`} route={route}/>
		)}
	</>
}