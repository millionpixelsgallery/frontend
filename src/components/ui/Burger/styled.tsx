import styled from 'styled-components'

export interface BurgerSCProps {}

export const BurgerSC = styled.div<BurgerSCProps>`
  .burger {
    width: 9px;
    height: 2px;
    background-color: ${({ theme }) => theme.color.burger.color};
    margin: 1px 0;
  }
`
