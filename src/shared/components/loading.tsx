import React from 'react'

interface Props {
	className?: string
}

export const Loading: React.FC<Props> = props => {
	const { className } = props

	return <div className={className}>
		...
	</div>
}