import styled from 'styled-components'
import { Col } from 'components/ui/Grid'

export interface MobilePlaceholderSCProps {}

export const MobilePlaceholderSC = styled(Col)<MobilePlaceholderSCProps>`
  width: 300px;

  .cardTitle {
    text-align: center;
    font: normal normal 600 28px/41px Oswald;
    letter-spacing: 0.56px;
  }
`
