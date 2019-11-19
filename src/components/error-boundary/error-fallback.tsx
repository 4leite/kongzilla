import React from 'react'

interface Props {
	className?: string
	error?: Error
	info?: {
		componentStack: string
	}
}

export const ErrorFallback: React.FunctionComponent<Props> = props => (
	<div className={props.className}>
		{props.error?.message ?? 'Error'}
	</div>
)