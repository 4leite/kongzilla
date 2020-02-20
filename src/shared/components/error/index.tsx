import React from 'react'
import { ErrorMessage } from './error-message'
import styled from 'styled-components'

const Container = styled.div`
	padding-top: 20px;
	padding-bottom: 10px;
	grid-column-start: start;
	grid-column-end: span end;
	justify-self: center;
	color: red;
`
interface Props {
	children?: any
	className?: string
	fallback: React.FC<State>
}

interface State {
	error?: Error,
	info?: {
		componentStack: string
	}
}
// ErrorBoundary must be a class component per 
export class ErrorBoundary extends React.Component<Props, State> {
	static defaultProps: Props = {
		fallback: ErrorMessage
	}

	state: State = {}

	componentDidCatch = (error: Error, info: any) => {
		this.setState({error, info})
	}

	render() {
		const { children, fallback: FallbackComponent } = this.props
		const { error, info } = this.state

		return ( 
			error ? 
				<Container>
					<FallbackComponent error={error} info={info}/>
				</Container>
			: 
				children
		)
	}
}