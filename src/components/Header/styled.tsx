import styled from 'styled-components'
import { Row } from 'components/ui/Grid'

export interface HeaderSCProps {}

export const HeaderSC = styled(Row)<HeaderSCProps>`   
  padding-bottom: 40px;
  .gallery {
    width: 122px;
  }
  .pixels {
    width: 76px;
  }
  .marketplace {
    width: 98px;
  }
`
