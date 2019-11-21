import React, { useMemo } from 'react'
import { useStoreState } from 'store'
import { routeToString } from 'model/kong-routes'

interface Props {
	className?: string
	selected: string
}

export const KongSelectedRoute: React.FC<Props> = props => {
	const { className, selected } = props

	const readRoutes = useStoreState(state => state.routes.resource.read) 

	const selectedJSON = useMemo(() => {
		const route = readRoutes().find(route => route.key === selected)
		return route && routeToString(route)
	}, [readRoutes, selected])

	return <div className={className}>
		<pre>
			{selectedJSON}
		</pre>
	</div>
}