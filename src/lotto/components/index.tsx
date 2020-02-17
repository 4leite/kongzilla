import React, { Suspense } from 'react'
import { Loading } from 'shared/components/loading'
import { ErrorBoundary } from 'shared/components/error'
import styled from 'styled-components'
import { theme } from 'shared/constants/style'
import { LottoRouteAdd } from './lotto-route-add'
import { LottoRouteList } from './lotto-route-list'

const Container = styled.div`
	background-color: ${theme.page.background};
	color: ${theme.page.color};
	display: grid;
	grid-template-columns: [start a1] auto [b1] auto [c1] auto [d1] auto [e1] auto [f1 end];
	grid-gap: 10px 10px;
	padding: 20px 10px;
	align-content: start;
	justify-content: center;
`
const StyledErrorBoundary = styled(ErrorBoundary)`
	padding-top: 20px;
	padding-bottom: 10px;
	grid-column-start: start;
	grid-column-end: span end;
	justify-self: center;
	color: red;
`
const StyledLoading = styled(Loading)`
	padding-top: 20px;
	padding-bottom: 10px;
	grid-column-start: start;
	grid-column-end: span end;
	justify-self: center;
`
const H = styled.div`
	font-size: larger;
	color: ${theme.page.soft};
`
const ColumnNames: React.ReactFragment = <>
	<H>Priority</H><H>Path (Regex)</H><H>Destination</H><H>Methods</H><H></H>
</>

export const Lotto: React.FC = () => <>
	<Container>
		<StyledErrorBoundary>
			<Suspense fallback={<StyledLoading />}>
				{ColumnNames}
				<LottoRouteAdd />
				<StyledErrorBoundary>
					<Suspense fallback={<StyledLoading />}>
						<LottoRouteList />
					</Suspense>
				</StyledErrorBoundary>
			</Suspense>
		</StyledErrorBoundary>
	</Container>
</>


