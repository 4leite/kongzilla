import React from 'react'
import { KongRouteDefinition } from 'model/kong-routes'
import styled from 'styled-components'
import { useStoreState, useStoreActions } from 'store'
import { theme } from 'constants/style'
// import { theme } from 'constants/style'

interface Props {
	route: KongRouteDefinition
}

const RouteName = styled.div`
	grid-column-start: a1;
	grid-column-end: b1;
	color: ${theme.page.soft}
`
const RoutePriority = styled.div`
	grid-column-start: b1;
	grid-column-end: c1;
`
const RoutePath = styled.div`
	grid-column-start: c1;
	grid-column-end: d1;
`
const RouteMethods = styled.div`
	grid-column-start: d1;
	grid-column-end: e1;
	color: ${theme.page.soft}
`
const RouteActions = styled.div`
	grid-column-start: e1;
	grid-column-end: f1;
`

export const KongRoute: React.FunctionComponent<Props> = props => {
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
		<RouteMethods>[{route.methods.join(", ")}]</RouteMethods>
		<RouteActions>
			<button name='delete' onClick={onClick} disabled={isDisabled}>Delete</button>
		</RouteActions>
	</>
}