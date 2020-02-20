import React, { Suspense } from 'react'
import styled from 'styled-components'
import { Header } from 'shared/components/header'
import { Footer } from 'shared/components/footer'
import { useStoreState } from 'lotto/model'
import { theme } from 'shared/constants/style'
import { ErrorBoundary } from './error'
import { Loading } from './loading'

const PageContainer = styled.div`
	display: grid;
  	min-height: 100vh;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 100%;
`
const InterfaceContainer = styled.div`
	background-color: ${theme.page.background};
	color: ${theme.page.color};
	display: grid;
	grid-gap: 10px 10px;
	padding: 20px 10px;
	align-content: start;
	justify-content: center;
`

export const Page: React.FC = (props) => {

    const Interface = useStoreState(state => state.Interface)
    const columns = useStoreState(state => state.columns)

    const gridTemplateColumns = '[start]' + ' auto'.repeat(columns.length) + ' [end]'

    return <>
       <PageContainer>
            <Header>
                {props.children}
            </Header>
            <InterfaceContainer style={{gridTemplateColumns}}>
		        <ErrorBoundary>
			        <Suspense fallback={<Loading />}>
                        <Interface />
                    </Suspense>
                </ErrorBoundary>
            </InterfaceContainer>
            <Footer />
        </PageContainer>
    </>
}