import React from 'react'
import styled from 'styled-components'
import { theme } from 'shared/constants/style'
import { useStoreState } from 'shared/model'

const H = styled.div`
font-size: larger;
color: ${theme.page.soft};
`

export const ColumnNames: React.FC = () => {
	const columns = useStoreState(state => state.columns)

	return <>
		{columns.map((c) => <H key={c}>{c}</H>)}
	</>
}