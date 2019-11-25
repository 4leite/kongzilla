import React, { useMemo } from 'react'
import { useStoreState } from 'store'
import { exportRoute, KongRouteDefinition } from 'model/kong-routes'

interface Props {
	className?: string
	routes: KongRouteDefinition[]
}

export const KongRouteSelected: React.FC<Props> = props => {
	const { routes, className } = props

	const routeKey = useStoreState(state => state.routes.selectedKey)

	const routeJSON = useMemo(() => {
		const route = routeKey && routes.find(route => route.key === routeKey)
		return route && exportRoute(route)
	}, [routeKey, routes])

	return <div className={className}>
		<pre>
			{routeJSON}
		</pre>
	</div>
}