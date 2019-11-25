import React from 'react'
import { KongRouteDefinition, exportRoute } from 'model/kong-routes'
import { useStoreState, useStoreActions } from 'store'
import { theme } from 'constants/style'
import copy from 'clipboard-copy'

interface Props {
	route: KongRouteDefinition
}

const soft: React.CSSProperties = {color: theme.page.soft}
const bold: React.CSSProperties = {fontWeight: "bold"}
const deleted: React.CSSProperties = {color: theme.page.soft}


export const KongRouteRow: React.FC<Props> = props => {
	const { route } = props

	const selected = useStoreState(state => state.routes.selectedKey)
	const isDisabled: boolean = useStoreState(state => state.routes.resource.isFetching)

	const setSelected = useStoreActions(action => action.routes.setSelected)

	const deleteRouteAction = useStoreActions(actions => actions.routes.deleteRoute)
	const addRouteAction = useStoreActions(actions => actions.routes.addRoute)

	const onDeleteClick = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		// TODO: confirmation
		setSelected(null)
		deleteRouteAction(route)
	}

	const onActivateClick = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		// TODO: confirmation
		addRouteAction(route)
		.then((response: string) => {
			setSelected(`${response}_0`)
		})
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
				<button name='enable' onClick={onActivateClick} disabled={isDisabled}>Enable</button>
				:
				<button name='delete' onClick={onDeleteClick} disabled={isDisabled}>Disable</button>
			}
			<button onClick={onExportClick}>Export</button>
		</div>
	</>
}