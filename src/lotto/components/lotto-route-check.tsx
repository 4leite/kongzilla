import React from 'react'
import { useStoreState, useStoreActions } from 'lotto/model'
import { LottoRouteDefinition } from 'lotto/model/lotto-routes'

interface Props {
	path?: string
	className?: string
}

export const LottoRouteCheck: React.FC<Props> = props => {
	const { path, className } = props

	let message: string | null = null

	const readRoutes = useStoreState(state => state.routes.resource.read)
	const setSelected = useStoreActions(state => state.routes.setSelected)
	
	if (path && path.length > 5) {
		const routes: LottoRouteDefinition[] = readRoutes()
		
		const route = routes.find(route => route.request.path === path)

		if (route) {
			setSelected(route.id)
		} else {
			setSelected(null)
			message = 'Not Found'
		}
	}
		
	return <div className={className}>
		{message}
	</div>
}