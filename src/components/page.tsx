import React from 'react'
import styled from 'styled-components'
import { Header } from './header'
import { Footer } from './footer'
import { Lotto } from './lotto'
// import { ControlPanel } from './control-panel'

const PageContainer = styled.div`
	display: grid;
  	min-height: 100vh;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 100%;
`

export const Page: React.FC = () => <>
   <PageContainer>
        <Header />
		{/*<ControlPanel />*/}
        <Lotto />
        <Footer />
    </PageContainer>
</>