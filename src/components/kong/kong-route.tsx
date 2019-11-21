import React from 'react'
import { KongRouteDefinition, routeToString } from 'model/kong-routes'
import { useStoreState, useStoreActions } from 'store'
import { theme } from 'constants/style'
import copy from 'clipboard-copy'

interface Props {
	route: KongRouteDefinition
	selected: string
	setSelected: (key: string) => void
}

const soft = {color: theme.page.soft}
const bold: React.CSSProperties = {fontWeight: "bold"}

export const KongRoute: React.FC<Props> = props => {
	const { route, selected, setSelected } = props

	const isDisabled: boolean = useStoreState(state => state.routes.resource.isFetching)
	const deleteRouteAction = useStoreActions(actions => actions.routes.deleteRoute)
	const onDeleteClick = (e: React.SyntheticEvent) => {
		e.preventDefault()
		// TODO: confirmation
		deleteRouteAction(route)
	}

	const onExportClick = (e: React.SyntheticEvent) => {
		setSelected(route.key)
		copy(routeToString(route))
	}

	const onSelectClick = (e: React.SyntheticEvent) => setSelected(route.key)

	const isSelected = selected === route.key
	return <>
		<div style={isSelected ? {} : soft} onClick={onSelectClick}>{route.name}</div>
		<div style={isSelected ? bold : {}} onClick={onSelectClick}>{route.priority}</div>
		<div style={isSelected ? bold : {}} onClick={onSelectClick}>{route.path}</div>
		<div style={isSelected ? bold : {}} onClick={onSelectClick}>{route.serviceName ?? route.serviceId}</div>
		<div style={isSelected ? {} : soft} onClick={onSelectClick}>[{route.methods.join(", ")}]</div>
		<div>
			<button name='delete' onClick={onDeleteClick} disabled={isDisabled}>Delete</button>
			<button onClick={onExportClick}>Export</button>
		</div>
	</>
}