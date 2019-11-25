import React, { useMemo } from 'react'
import { KongRouteRow } from 'components/kong/kong-route-row'
import { useStoreState } from 'store'
import { KongRouteDefinition } from 'model/kong-routes'
import { KongRouteSelected } from 'components/kong/kong-route-selected'
import styled from 'styled-components'

const StyledKongRouteSelected = styled(KongRouteSelected)`
	grid-column-start: start;
	grid-column-end: span end;
`

interface ServiceIdTitle {
	[key: string]: string
}

// This is an estimation of kongs rules for route matching priority
const routeSorter = (a: KongRouteDefinition, b: KongRouteDefinition) => {
	if (a.priority > b.priority) {
		return -1
	}
	if (a.priority < b.priority) {
		return 1
	}
	if (a.path.length > b.path.length) {
		return -1
	}
	if (a.path.length < b.path.length) {
		return 1
	}
	if (a.created < b.created) {
		return -1
	}
	return 1
}

export const KongRouteList: React.FC = () => {
	const readServices = useStoreState(state => state.services.resource.read)
	const readRoutes = useStoreState(state => state.routes.resource.read)

	const serviceNames: ServiceIdTitle = useMemo(
		// Reduce services to array with id as key and title as value
		() => (readServices().reduce((a: ServiceIdTitle, service) => {
			a[service.id] = service.name
			return a
		}, {})
	), [readServices])

	const routes = useMemo(
		// Sort the routes and append the service name
		() => readRoutes().sort(routeSorter).map((route) => ({
			...route,
			serviceName: serviceNames[route.serviceId]
		})
	), [readRoutes, serviceNames])
	
	return <>
		{routes.map(route => <KongRouteRow
			key={`route-${route.key}`} 
			route={route}
		/>)}
		<StyledKongRouteSelected routes={routes}/>
	</>
}