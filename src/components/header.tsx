import React from 'react'
import styled from 'styled-components'
import logo from 'assets/logo.svg'
import { theme } from 'constants/style'

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

export const Header: React.FC = () => <>
  <HeaderContainer>
    <Logo src={logo} alt="logo" />
    <h1>Kongzilla</h1>
    {/*<p>API_URL: {window._env_.API_URL}</p>*/}
  </HeaderContainer>
</>
