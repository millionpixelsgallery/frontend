import styled from 'styled-components'

export interface MyPixelsSCProps {}

export const MyPixelsSC = styled.div<MyPixelsSCProps>`
  min-height: 691px;
  box-shadow: 0 16px 40px ${({ theme }) => theme.color.myPixels.shadow};
  background-color: ${({ theme }) => theme.color.myPixels.bg};
  padding: 60px 100px 50px;
`
