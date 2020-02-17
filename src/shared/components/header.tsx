import React from 'react'
import styled from 'styled-components'
import logo from 'shared/assets/logo.svg'
import { theme } from 'shared/constants/style'

const Logo = styled.img`
  height: 60px;
`
const HeaderContainer = styled.div`
  background-color: ${theme.header.background};
  color: ${theme.header.color};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
	padding: 20px 20px;
`

export const Header: React.FC = (props) => {

  return <>
    <HeaderContainer>
      <Logo src={logo} alt="logo" />
      <h1>Kongzilla</h1>
      <Container>
        {props.children}
      </Container>
    </HeaderContainer>
  </>
}
