import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
	padding-top: 20px;
	padding-bottom: 10px;
	grid-column-start: start;
	grid-column-end: span end;
	justify-self: center;
`
export const Loading: React.FC = () => {
	return <Container>
		...
	</Container>
}