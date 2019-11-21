import React, { useMemo } from 'react'
import { KongRoute } from 'components/kong/kong-route'
import { useStoreState } from 'store'
import { KongRouteDefinition } from 'model/kong-routes'
import { KongSelectedRoute } from 'components/kong/kong-selected'
import styled from 'styled-components'

interface Props {
	selected: string
	setSelected: (key: string) => void
}

const StyledKongSelected = styled(KongSelectedRoute)`
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

export const KongRouteList: React.FC<Props> = props => {
	const {selected, setSelected} = props

	const readServices = useStoreState(state => state.services.resource.read)
	const readRoutes = useStoreState(state => state.routes.resource.read)

	const serviceNames: ServiceIdTitle = useMemo(
		// Reduce services to array with id as key and title as value
		() => (readServices().reduce((a: ServiceIdTitle, service) => {
			a[service.id] = service.title
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
		{routes.map(route => <KongRoute
			key={`route-${route.key}`} 
			route={route}
			selected={selected}
			setSelected={setSelected}
		/>)}
		<StyledKongSelected selected={selected}/>
	</>
}