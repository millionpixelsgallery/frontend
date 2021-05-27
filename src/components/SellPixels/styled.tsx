import styled from 'styled-components'
import { InputSC } from 'components/ui/Input/styled'
import { ButtonSC } from 'components/ui/Button/styled'

export interface SellPixelsSCProps {}

export const SellPixelsSC = styled.div<SellPixelsSCProps>`
  width: 700px;
  height: 590px;
  padding: 50px;
  ${InputSC} {
    width: 310px;
  }
  ${ButtonSC} {
    display: block;
    margin: 190px 0 0 auto;
  }
`
