import React, { useMemo } from 'react'
import { KongServiceDefinition } from 'model/kong-services'
import { KongRoute } from 'components/kong/kong-route'
import { useStoreState } from 'store'

interface Props {
	service: KongServiceDefinition
}

export const KongRouteList: React.FunctionComponent<Props> = props => {

	const { service } = props

	const routes = useStoreState(state => state.routes.resource.read)()

	const sortedRoutes = useMemo(() => routes
		.filter(route => (route.service.id === service.id))
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
			route => <KongRoute key={`route-${route.key}`} route={route}/>
		)}
	</>
}