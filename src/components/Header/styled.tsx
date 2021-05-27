import styled from 'styled-components'
import { Row } from 'components/ui/Grid'
import { NavLinkSC } from 'components/ui/NavLink/styled'

export interface HeaderSCProps {}

export const HeaderSC = styled(Row)<HeaderSCProps>`
  padding-bottom: 40px;

  ${NavLinkSC} {
    white-space: nowrap;
    user-select: none;
  }

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
