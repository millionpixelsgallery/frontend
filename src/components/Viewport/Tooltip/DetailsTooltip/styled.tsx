import styled from 'styled-components'
import Card from 'components/ui/Card'

export interface DetailsTooltipSCProps {}

export const DetailsTooltipSC = styled(Card)`
  height: 152px;
  font: normal normal normal 16px/24px Oswald;
  letter-spacing: 0.32px;
  color: ${({ theme }) => theme.color.typography.text};
  white-space: nowrap;
  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
  }

  .disabled {
    pointer-events: none;
  }
`
