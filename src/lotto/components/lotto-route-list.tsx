import React, { useMemo } from 'react'
import { LottoRouteRow } from 'lotto/components/lotto-route-row'
import { useStoreState, useStoreActions } from 'lotto/model'
import { LottoRouteDefinition } from 'lotto/model/lotto-routes'
import { useLocalStorage } from 'shared/services/local-storage'

// This is an estimation of lottos rules for route matching priority
const routeSorter = (a: LottoRouteDefinition, b: LottoRouteDefinition) => {
	if (a.priority > b.priority) {
		return -1
	}
	if (a.priority < b.priority) {
		return 1
	}
	if (a.request.path.length > b.request.path.length) {
		return -1
	}
	if (a.request.path.length < b.request.path.length) {
		return 1
	}
	return 1
}


export const LottoRouteList: React.FC = () => {

	const [disabledRoutes, setDisabledRoutes] = useLocalStorage<LottoRouteDefinition[]>('lottozilla-deleted-routes', [])

	const readRoutes = useStoreState(state => state.routes.resource.read)
	const deleteRouteAction = useStoreActions(actions => actions.routes.deleteRoute)
	const addRouteAction = useStoreActions(actions => actions.routes.addRoute)

	const routes = useMemo(() => {
		return readRoutes().concat(disabledRoutes || []).sort(routeSorter)
	}, [disabledRoutes, readRoutes])

	const disableRoute = async (route: LottoRouteDefinition) => {
		await deleteRouteAction(route)
		route.isDeleted = true
		setDisabledRoutes([...disabledRoutes, route])
	}
	const enableRoute = async (route: LottoRouteDefinition) => {
		addRouteAction(route)
		setDisabledRoutes(disabledRoutes.filter((r: LottoRouteDefinition) => r.id !== route.id))
	}

	return <>
		{routes.map(route => <LottoRouteRow
			key={`route-${route.id}`} 
			route={route}
			disableRoute={disableRoute}
			enableRoute={enableRoute}
		/>)}
	</>
}