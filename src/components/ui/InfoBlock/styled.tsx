import styled from 'styled-components'
import { Col } from 'components/ui/Grid'

export interface InfoBlockSCProps {}

export const InfoBlockSC = styled(Col)<InfoBlockSCProps>`
  .title {
    color: ${({ theme }) => theme.color.infoBlock.title};
    font-size: 16px;
    letter-spacing: 0.56px;
    line-height: 30px;
    font-weight: 500;
  }
  
  .child {
    color: ${({ theme }) => theme.color.infoBlock.child};
    font-size: 24px;
    letter-spacing: 0.84px;
    line-height: 30px;
    font-weight: 700;
  }
`
