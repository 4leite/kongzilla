import React from 'react'
import styled from 'styled-components'
import { Header } from 'shared/components/header'
import { Footer } from 'shared/components/footer'
import { useStoreState } from 'lotto/model'

const PageContainer = styled.div`
	display: grid;
  	min-height: 100vh;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 100%;
`

export const Page: React.FC = (props) => {

    const Interface = useStoreState(state => state.Interface)

    return <>
       <PageContainer>
            <Header>
                {props.children}
            </Header>
            <Interface />
            <Footer />
        </PageContainer>
    </>
}