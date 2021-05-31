import styled from 'styled-components'
import { Row, RowProps } from 'components/ui/Grid'
import { AreaSC } from 'components/ui/Area/styled'

export interface PixelsDimensionsSCProps extends RowProps {}

export const PixelsDimensionsSC = styled(Row)<PixelsDimensionsSCProps>`
  ${AreaSC} {
    box-sizing: border-box;
    padding-right: 5px;
    padding-left: 5px;
    min-width: 100px;
    height: 50px;
    text-align: center;
  }

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
