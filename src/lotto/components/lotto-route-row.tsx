import React from 'react'
import { useStoreState } from 'lotto/model'
import { theme } from 'shared/constants/style'
import { LottoRouteDefinition } from 'lotto/model/lotto-routes'

interface Props {
	route: LottoRouteDefinition
	enableRoute: (route: LottoRouteDefinition) => void
	disableRoute: (route: LottoRouteDefinition) => void
}

const soft: React.CSSProperties = {color: theme.page.soft}
const bold: React.CSSProperties = {fontWeight: "bold"}
const deleted: React.CSSProperties = {color: theme.page.soft}


export const LottoRouteRow: React.FC<Props> = props => {
	const { route, enableRoute, disableRoute } = props

	const selected = useStoreState(state => state.routes.selectedKey)
	const isDisabled: boolean = useStoreState(state => state.routes.resource.isFetching)

	const onDisableClick = (e: React.SyntheticEvent) => {
		e.preventDefault()
		// TODO: confirmation
		disableRoute(route)
	}

	const onEnableClick = (e: React.SyntheticEvent) => {
		e.preventDefault()
		// TODO: confirmation
		enableRoute(route)
	}

	const isSelected = selected === route.id
	const { isDeleted } = route

	return <>
		<div style={isDeleted ? deleted : isSelected ? bold : {}}>{route.priority}</div>
		<div style={isDeleted ? deleted : isSelected ? bold : {}}>{route.request.path}</div>
		<div style={isDeleted ? deleted : isSelected ? bold : {}}>{route.response.host}</div>
		<div style={isDeleted ? deleted : isSelected ? {} : soft}>[{route.request.methods.join(", ")}]</div>
		<div>
			{isDeleted ? 
				<button name='enable' onClick={onEnableClick} disabled={isDisabled}>Enable</button>
				:
				<button name='delete' onClick={onDisableClick} disabled={isDisabled}>Disable</button>
			}
		</div>
	</>
}