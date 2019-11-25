import React from 'react'
import { KongRouteDefinition, exportRoute } from 'model/kong-routes'
import { useStoreState, useStoreActions } from 'store'
import { theme } from 'constants/style'
import copy from 'clipboard-copy'

interface Props {
	route: KongRouteDefinition
}

const soft = {color: theme.page.soft}
const bold: React.CSSProperties = {fontWeight: "bold"}

export const KongRouteRow: React.FC<Props> = props => {
	const { route } = props

	const selected = useStoreState(state => state.routes.selectedKey)
	const setSelected = useStoreActions(action => action.routes.setSelected)

	const isDisabled: boolean = useStoreState(state => state.routes.resource.isFetching)
	const deleteRouteAction = useStoreActions(actions => actions.routes.deleteRoute)
	const onDeleteClick = (e: React.SyntheticEvent) => {
		e.preventDefault()
		// TODO: confirmation
		deleteRouteAction(route)
	}

	const onExportClick = (e: React.SyntheticEvent) => {
		setSelected(route.key)
		copy(exportRoute(route))
	}

	const isSelected = selected === route.key
	return <>
		<div style={isSelected ? {} : soft}>{route.name}</div>
		<div style={isSelected ? bold : {}}>{route.priority}</div>
		<div style={isSelected ? bold : {}}>{route.path}</div>
		<div style={isSelected ? bold : {}}>{route.serviceName ?? route.serviceId}</div>
		<div style={isSelected ? {} : soft}>[{route.methods.join(", ")}]</div>
		<div>
			<button name='delete' onClick={onDeleteClick} disabled={isDisabled}>Delete</button>
			<button onClick={onExportClick}>Export</button>
		</div>
	</>
}