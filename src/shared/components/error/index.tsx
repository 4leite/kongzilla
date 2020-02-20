import React from 'react'
import { ErrorMessage } from './error-message'

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
		const { children, className, fallback: FallbackComponent } = this.props
		const { error, info } = this.state

		return ( 
			error ? 
				<div className={className}>
					<FallbackComponent error={error} info={info}/>
				</div>
			: 
				children
		)
	}
}