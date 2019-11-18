import React from 'react'
import styled from 'styled-components'

const LoadingContainer = styled.div`
	grid-column-start: k-l;
	grid-column-end: span k-r;
	align-self: center;
	justify-self: center;
`

export const Loading: React.FunctionComponent = (props) => {

	return <LoadingContainer>
		...
	</LoadingContainer>
}