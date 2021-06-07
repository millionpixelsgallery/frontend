import styled from 'styled-components'
import { InputSC } from 'components/ui/Input/styled'
import { ButtonSC } from 'components/ui/Button/styled'

export interface SellPixelsSCProps {}

export const SellPixelsSC = styled.div<SellPixelsSCProps>`
  width: 800px;
  height: 700px;
  padding: 50px;
  ${InputSC} {
    color: ${({ theme }) => theme.color.link.primaryPrimary};
    width: 310px;
  }
  ${ButtonSC} {
    display: block;
    margin: 190px 0 0 auto;
  }
`
