import React from 'react'
import { KongRouteDefinition } from 'model/kong-routes'
import styled from 'styled-components'

interface Props {
	route: KongRouteDefinition
}

const RoutePriority = styled.div`
	grid-column-start: k-l;
	grid-column-end: k-mid-l;
`
const RoutePath = styled.div`
	grid-column-start: k-mid-l;
	grid-column-end: k-mid-r;
`
const RouteMethod = styled.div`
	grid-column-start: k-mid-r;
	grid-column-end: k-r;
	justify-self: right;
`

export const KongRoute: React.FunctionComponent<Props> = props => {

	const { route } = props

	const rule = `${route.path} `

	return <>
		<RoutePriority>{route.priority}</RoutePriority>
		<RoutePath>{rule}</RoutePath>
		<RouteMethod>[{route.methods.join(", ")}]</RouteMethod>
	</>
}