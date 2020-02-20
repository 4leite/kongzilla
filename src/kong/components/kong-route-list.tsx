import React, { useMemo } from 'react'
import { KongRouteRow } from './kong-route-row'
import { useStoreState, useStoreActions } from 'kong/model'
import { KongRouteDefinition } from 'kong/model/kong-routes'
import { KongRouteSelected } from './kong-route-selected'
import styled from 'styled-components'
import { useLocalStorage } from 'shared/services/local-storage'

const StyledKongRouteSelected = styled(KongRouteSelected)`
	grid-column-start: start;
	grid-column-end: span end;
`

interface ServiceIdName {
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

	const [disabledRoutes, setDisabledRoutes] = useLocalStorage<KongRouteDefinition[]>('zilla-kong-deleted-routes', [])

	const readServices = useStoreState(state => state.services.resource.read)
	const readRoutes = useStoreState(state => state.routes.resource.read)
	const deleteRouteAction = useStoreActions(actions => actions.routes.deleteRoute)
	const addRouteAction = useStoreActions(actions => actions.routes.addRoute)

	const serviceNames: ServiceIdName = useMemo(
		// Reduce services to array with id as key and title as value
		() => (readServices().reduce((a: ServiceIdName, service) => {
			a[service.id] = service.name
			return a
		}, {})
	), [readServices])

	const routes = useMemo(
		// Sort the routes and append the service name
		() => readRoutes()
			.concat(disabledRoutes || [])
			.sort(routeSorter)
			.map((route) => ({
			...route,
			serviceName: serviceNames[route.serviceId]
		})
	), [disabledRoutes, readRoutes, serviceNames])

	const disableRoute = async (route: KongRouteDefinition) => {
		await deleteRouteAction(route)
		route.isDeleted = true
		setDisabledRoutes([...disabledRoutes, route])
	}
	const enableRoute = async (route: KongRouteDefinition) => {
		addRouteAction(route)
		setDisabledRoutes(disabledRoutes.filter((r: KongRouteDefinition) => r.key !== route.key))
	}
	const deleteRoute = async (route: KongRouteDefinition) => {
		setDisabledRoutes(disabledRoutes.filter((r: KongRouteDefinition) => r.key !== route.key))
	}

	return <>
		{routes.map(route => <KongRouteRow
			key={`route-${route.key}`} 
			route={route}
			disableRoute={disableRoute}
			enableRoute={enableRoute}
			deleteRoute={deleteRoute}
		/>)}
		<StyledKongRouteSelected routes={routes}/>
	</>
}