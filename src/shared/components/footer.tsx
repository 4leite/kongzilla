import React from 'react'
import styled from 'styled-components'
import { theme } from 'shared/constants/style'

const FooterContainer = styled.div`
	background-color: ${theme.footer.background};
	color: ${theme.footer.color};
	margin: 40px 20px;
	margin-top: 20px;
	align-items: center;
	justify-content: center;
	text-align: center;
`

export const Footer: React.FC = () => <>
	<FooterContainer>
		. . .
	</FooterContainer>
</>