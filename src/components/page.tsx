import React from 'react'
import styled from 'styled-components'
import { Kong } from 'components/kong'
import { Header } from './kong/header'
import { Footer } from './footer'
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
        <Kong />
        <Footer />
    </PageContainer>
</>