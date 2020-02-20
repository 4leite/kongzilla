import React, { useMemo, useState } from 'react'
import { LottoRouteRow } from 'lotto/components/lotto-route-row'
import { useStoreState, useStoreActions } from 'lotto/model'
import { LottoRouteDefinition } from 'lotto/model/lotto-routes'
import { useLocalStorage } from 'shared/services/local-storage'
import { ErrorMessage } from 'shared/components/error/error-message'
import styled from 'styled-components'

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
const StyledErrorMessage = styled(ErrorMessage)`
	padding-top: 20px;
	padding-bottom: 10px;
	grid-column-start: start;
	grid-column-end: span end;
	justify-self: center;
	color: red;
`

export const LottoRouteList: React.FC = () => {

	const [disabledRoutes, setDisabledRoutes] = useLocalStorage<LottoRouteDefinition[]>('zilla-lotto-deleted-routes', [])
	const [ error, setError ] = useState()

	const readRoutes = useStoreState(state => state.routes.resource.read)
	const deleteRouteAction = useStoreActions(actions => actions.routes.deleteRoute)
	const addRouteAction = useStoreActions(actions => actions.routes.addRoute)

	const routes = useMemo(() => {
		return readRoutes().concat(disabledRoutes || []).sort(routeSorter)
	}, [disabledRoutes, readRoutes])

	const disableRoute = async (route: LottoRouteDefinition) => {
		try {
			await deleteRouteAction(route)
			route.isDisabled = true
			setDisabledRoutes([...disabledRoutes, route])
		} catch (err) {
			setError(err)
		}
	}
	const enableRoute = async (route: LottoRouteDefinition) => {
		try {
			await addRouteAction(route)
			setDisabledRoutes(disabledRoutes.filter((r: LottoRouteDefinition) => r.id !== route.id))
		} catch (err) {
			setError(err)
		}
	}
	const deleteRoute = async (route: LottoRouteDefinition) => {
		try {
			setDisabledRoutes(disabledRoutes.filter((r: LottoRouteDefinition) => r.id !== route.id))
		} catch (err) {
			setError(err)
		}
	}

	return <>
		{routes.map(route => <LottoRouteRow
			key={`route-${route.id}`} 
			route={route}
			disableRoute={disableRoute}
			enableRoute={enableRoute}
			deleteRoute={deleteRoute}
		/>)}
		{error && <StyledErrorMessage error={error}/>}
	</>
}