import React from 'react'
import { KongRouteDefinition, exportRoute } from 'kong/model/kong-routes'
import { useStoreState, useStoreActions } from 'kong/model'
import { theme } from 'shared/constants/style'
import copy from 'clipboard-copy'
import { onClick } from 'shared/helpers/event-handlers'

interface Props {
	route: KongRouteDefinition
	enableRoute: (route: KongRouteDefinition) => void
	disableRoute: (route: KongRouteDefinition) => void
	deleteRoute: (route: KongRouteDefinition) => void
}

const soft: React.CSSProperties = {color: theme.page.soft}
const bold: React.CSSProperties = {fontWeight: "bold"}
const deleted: React.CSSProperties = {color: theme.page.soft}

export const KongRouteRow: React.FC<Props> = props => {
	const { route, enableRoute, disableRoute, deleteRoute } = props
	const { isDeleted } = route

	const selected = useStoreState(state => state.routes.selectedKey)
	const setSelected = useStoreActions(action => action.routes.setSelected)
	const isFetching: boolean = useStoreState(state => state.routes.resource.isFetching)

	const copyToClipboard = () => {
		copy(exportRoute(route))
		setSelected(route.key)
	}

	const isSelected = selected === route.key

	return <>
		<div style={isDeleted ? deleted : isSelected ? {} : soft}>
			{route.name}
		</div>
		<div style={isDeleted ? deleted : isSelected ? bold : {}}>{route.priority}</div>
		<div style={isDeleted ? deleted : isSelected ? bold : {}}>{route.path}</div>
		<div style={isDeleted ? deleted : isSelected ? bold : {}}>{route.serviceName ?? route.serviceId}</div>
		<div style={isDeleted ? deleted : isSelected ? {} : soft}>[{route.methods.join(", ")}]</div>
		<div>
			{isDeleted ?
				<>
					<button name='enable' onClick={onClick(() => enableRoute(route))} disabled={isFetching}>Enable</button>
					<button name='delete' onClick={onClick(() => deleteRoute(route))} disabled={isFetching}>Delete</button>
				</>
				:
				<button name='disable' onClick={onClick(() => disableRoute(route))} disabled={isFetching}>Disable</button>
			}
			<button onClick={onClick(copyToClipboard)}>Export</button>
		</div>
	</>
}