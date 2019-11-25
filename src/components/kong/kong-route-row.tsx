import React from 'react'
import { KongRouteDefinition, exportRoute } from 'model/kong-routes'
import { useStoreState, useStoreActions } from 'store'
import { theme } from 'constants/style'
import copy from 'clipboard-copy'

interface Props {
	route: KongRouteDefinition
	enableRoute: (route: KongRouteDefinition) => void
	disableRoute: (route: KongRouteDefinition) => void
}

const soft: React.CSSProperties = {color: theme.page.soft}
const bold: React.CSSProperties = {fontWeight: "bold"}
const deleted: React.CSSProperties = {color: theme.page.soft}


export const KongRouteRow: React.FC<Props> = props => {
	const { route, enableRoute, disableRoute } = props

	const selected = useStoreState(state => state.routes.selectedKey)
	const setSelected = useStoreActions(action => action.routes.setSelected)
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

	const onExportClick = (e: React.SyntheticEvent) => {
		e.preventDefault()
		copy(exportRoute(route))
		setSelected(route.key)
	}

	const isSelected = selected === route.key
	const { isDeleted } = route

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
				<button name='enable' onClick={onEnableClick} disabled={isDisabled}>Enable</button>
				:
				<button name='delete' onClick={onDisableClick} disabled={isDisabled}>Disable</button>
			}
			<button onClick={onExportClick}>Export</button>
		</div>
	</>
}