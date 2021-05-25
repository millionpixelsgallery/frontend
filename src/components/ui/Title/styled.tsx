import styled from 'styled-components'

export interface TitleSCProps {}

export const TitleSC = styled.span<TitleSCProps>`
  font-size: 32px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.color.typography.title};
  line-height: 47px;
  letter-spacing: 0.64px;
  font-family: 'Oswald', sans-serif;
`
