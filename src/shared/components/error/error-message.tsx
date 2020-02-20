import React from  'react'

interface props {
	error?: Error
	className?: string
}

export const ErrorMessage: React.FC<props> = (props) => <>
	<div className={props.className}>
		{props.error?.message ?? 'Error'}
	</div>
</>