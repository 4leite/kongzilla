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

	const route = (routeKey && routes.find(route => route.key === routeKey)) || null

	const routeJSON = useMemo(() => (
		route && exportRoute(route)
	), [route])

	return <div className={className}>
		<pre>
			{routeJSON}
		</pre>
	</div>
}