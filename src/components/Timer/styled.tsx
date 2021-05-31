import styled from 'styled-components'
import { AreaSC } from 'components/ui/Area/styled'

export interface TimerSCProps {}

export const TimerSC = styled.div<TimerSCProps>`
  ${AreaSC} {
    display: block;
    box-sizing: border-box;
    min-width: 175px;
    height: 50px;
    text-align: center;
  }
`
