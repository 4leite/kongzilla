import React from 'react'
import styled from 'styled-components'
import logo from 'assets/logo.svg'

const Logo = styled.img`
  height: 60px;
`
const HeaderContainer = styled.div`
  background-color: #303030;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

export const Header: React.FunctionComponent = () => <>
  <HeaderContainer>
    <Logo src={logo} alt="logo" />
    <h1>Kongzilla</h1>
  </HeaderContainer>
</>