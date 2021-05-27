import styled from 'styled-components'
import { AreaSC } from 'components/ui/Area/styled'

export interface ByPixelsReviewPixelsSCProps {}

export const ByPixelsReviewPixelsSC = styled.div<ByPixelsReviewPixelsSCProps>`
  height: 100%;
  .full-height {
    height: 100%;
  }
  .price {
    width: 310px;
  }
`

export const CalculateSC = styled.div<ByPixelsReviewPixelsSCProps>`
  text-transform: uppercase;
  ${AreaSC} {
    width: 100px;
    padding-left: 0;
    padding-right: 0;
    text-align: center;
  }
`
