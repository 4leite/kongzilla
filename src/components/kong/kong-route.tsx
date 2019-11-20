import React from 'react'
import { KongRouteDefinition } from 'model/kong-routes'
import styled from 'styled-components'
import { useStoreState, useStoreActions } from 'store'
import { theme } from 'constants/style'

interface Props {
	route: KongRouteDefinition
}

const RouteName = styled.div`
	color: ${theme.page.soft}
`
const RoutePriority = styled.div`
`
const RoutePath = styled.div`
`
const RouteMethods = styled.div`
	color: ${theme.page.soft}
`
const RouteDestination = styled.div`
`
const RouteActions = styled.div`
`

export const KongRoute: React.FC<Props> = props => {
	const { route } = props

	const isDisabled: boolean = useStoreState(state => state.routes.resource.isFetching)
	const deleteRouteAction = useStoreActions(actions => actions.routes.deleteRoute)

	const onClick = (e: React.SyntheticEvent) => {
		e.preventDefault()
		// TODO: confirmation
		deleteRouteAction(route)
	}

	return <>
		<RouteName>{route.name}</RouteName>
		<RoutePriority>{route.priority}</RoutePriority>
		<RoutePath>{route.path}</RoutePath>
		<RouteDestination>{route.serviceName ?? route.serviceId}</RouteDestination>
		<RouteMethods>[{route.methods.join(", ")}]</RouteMethods>
		<RouteActions>
			<button name='delete' onClick={onClick} disabled={isDisabled}>Delete</button>
		</RouteActions>
	</>
}