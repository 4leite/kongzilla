import React from 'react'
import { useStoreState, useStoreActions } from 'kong/model'
import { KongRouteDefinition } from 'kong/model/kong-routes'

interface Props {
	path?: string
	className?: string
}

export const KongRouteCheck: React.FC<Props> = props => {
	const { path, className } = props

	let message: string | null = null

	const readRoutes = useStoreState(state => state.routes.resource.read)
	const setSelected = useStoreActions(state => state.routes.setSelected)
	
	if (path && path.length > 5) {
		const routes: KongRouteDefinition[] = readRoutes()
		
		const route = routes.find(route => route.path === path)

		if (route) {
			setSelected(route.key)
		} else {
			setSelected(null)
			message = 'Not Found'
		}
	}
		
	return <div className={className}>
		{message}
	</div>
}