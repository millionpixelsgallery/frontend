import styled from 'styled-components'
import { Row, RowProps } from 'components/ui/Grid'
import { AreaSC } from 'components/ui/Area/styled'

export interface PixelsDimensionsSCProps extends RowProps {}

export const PixelsDimensionsSC = styled(Row)<PixelsDimensionsSCProps>`
  .bold-text {
    font-size: 22px;
    line-height: 32px;
    letter-spacing: 0.44px;
    font-weight: 600;
  }

  ${AreaSC} .name-wrapper {
    text-transform: uppercase;
  }
`
