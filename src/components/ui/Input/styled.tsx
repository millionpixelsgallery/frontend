import styled from 'styled-components'
import { CSSProperties } from 'react'

export interface InputSCProps {
  fontSize?: number
  fontWeight?: number | string
  textAlign?: CSSProperties['textAlign']
}

export const InputSC = styled.input<InputSCProps>`
  font-weight: ${({ fontWeight = 600 }) => fontWeight};
  font-size: ${({ theme, fontSize = 22 }) => theme.px(fontSize)};
  letter-spacing: 0.44px;
  color: ${({ theme }) => theme.color.typography.text};
  border: none;
  outline: none;
  text-align: ${({ textAlign = 'center' }) => textAlign};
  width: 100%;
  padding: 0;
  ::placeholder {
    color: ${({ theme }) => theme.color.typography.placeholder};
  }
`

export interface InputWrapperSCProps {
  maxWidth?: number | string
}

export const InputWrapperSC = styled.div<InputWrapperSCProps>`
  display: flex;
  flex-direction: column;
  ${({ maxWidth, theme }) => (maxWidth ? `max-width: ${theme.px(maxWidth)};` : '')};
`
