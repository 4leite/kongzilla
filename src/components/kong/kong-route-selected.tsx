import React, { useMemo } from 'react'
import { useStoreState } from 'store'
import { routeToString } from 'model/kong-routes'

interface Props {
	className?: string
}

export const KongRouteSelected: React.FC<Props> = props => {
	const { className } = props

	const route = useStoreState(state => state.routes.selectedRoute)

	const routeJSON = useMemo(() => (
		route && routeToString(route)
	), [route])

	return <div className={className}>
		<pre>
			{routeJSON}
		</pre>
	</div>
}