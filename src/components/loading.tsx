import React from 'react'

interface Props {
	className?: string
}

export const Loading: React.FunctionComponent<Props> = props => {
	const { className } = props

	return <div className={className}>
		...
	</div>
}