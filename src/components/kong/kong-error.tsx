import styled from 'styled-components';

interface Props {
	error?: Error
}

const Header = styled.div`
grid-column-start: 1;
grid-column-end: 4;
`

const ErrorMessage = styled.div`
grid-column-start: 1;
grid-column-end: 4;
`

export const KongError: React.FunctionComponent<Props> = props => {
	const { error } = props

	return <>
		<Header>Oh noes!</Header>
		<ErrorMessage>
			{error?.message ?? 'An error has occured'}
		</ErrorMessage>
	</>
}