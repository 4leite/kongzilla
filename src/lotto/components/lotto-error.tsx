import React from 'react'
import styled from 'styled-components';

interface Props {
	error?: Error
}

const Header = styled.div`
	grid-column-start: start;
	grid-column-end: span end;
`

const ErrorMessage = styled.div`
	grid-column-start: start;
	grid-column-end: span end;
`

export const LottoError: React.FC<Props> = props => {
	const { error } = props

	return <>
		<Header>Oh noes!</Header>
		<ErrorMessage>
			{error?.message ?? 'An error has occured'}
		</ErrorMessage>
	</>
}