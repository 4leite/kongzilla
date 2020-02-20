import React from 'react'
import { useStoreState } from 'lotto/model'
import { theme } from 'shared/constants/style'
import { LottoRouteDefinition } from 'lotto/model/lotto-routes'
import { onClick } from 'shared/helpers/event-handlers'

interface Props {
	route: LottoRouteDefinition
	enableRoute: (route: LottoRouteDefinition) => void
	disableRoute: (route: LottoRouteDefinition) => void
	deleteRoute: (route: LottoRouteDefinition) => void
}

const soft: React.CSSProperties = {color: theme.page.soft}
const bold: React.CSSProperties = {fontWeight: "bold"}
const deleted: React.CSSProperties = {color: theme.page.soft}

export const LottoRouteRow: React.FC<Props> = props => {
	const { route, enableRoute, disableRoute, deleteRoute } = props
	const { isDisabled } = route

	const isFetching = useStoreState(state => state.routes.resource.isFetching)
	const isSelected = useStoreState(state => state.routes.selectedKey) === route.id

	return <>
		<div style={isDisabled ? deleted : isSelected ? bold : {}}>{route.priority}</div>
		<div style={isDisabled ? deleted : isSelected ? bold : {}}>{route.request.path}</div>
		<div style={isDisabled ? deleted : isSelected ? bold : {}}>{route.response.host}</div>
		<div style={isDisabled ? deleted : isSelected ? {} : soft}>[{route.request.methods.join(", ")}]</div>
		<div>
			{isDisabled ?
				<>
					<button name='enable' onClick={onClick(() => enableRoute(route))} disabled={isFetching}>Enable</button>
					<button name='delete' onClick={onClick(() => deleteRoute(route))} disabled={isFetching}>Delete</button>
				</>
				:
				<button name='disable' onClick={onClick(() => disableRoute(route))} disabled={isFetching}>Disable</button>
			}
		</div>
	</>
}