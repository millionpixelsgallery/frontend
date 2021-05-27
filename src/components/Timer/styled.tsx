import styled from 'styled-components'
import { AreaSC } from 'components/ui/Area/styled'

export interface TimerSCProps {}

export const TimerSC = styled.div<TimerSCProps>`
  ${AreaSC} {
    display: block;
    min-width: 175px;
    text-align: center;
  }
`
