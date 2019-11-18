import React from 'react'

interface Props {
	children?: any
	fallback: React.FunctionComponent<State>
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
		fallback: props => <>{props.error?.message ?? 'Error'}</>
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
				<FallbackComponent error={error} info={info}/>
			: 
				children
		)
	}
}