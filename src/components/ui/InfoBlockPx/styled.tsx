import styled from 'styled-components'
import { Col } from 'components/ui/Grid'

export interface InfoBlockPxSCProps {}

export const InfoBlockPxSC = styled(Col)<InfoBlockPxSCProps>`
  .title {
    color: ${({ theme }) => theme.color.infoBlockPx.title};
    font-size: 22px;
    letter-spacing: 0.44px;
    line-height: 32px;
    font-weight: 600;
  }

  .child {
    color: ${({ theme }) => theme.color.infoBlockPx.child};
    font-size: 12px;
    letter-spacing: 0.24px;
    line-height: 17px;
    font-weight: 600;
  }
`
