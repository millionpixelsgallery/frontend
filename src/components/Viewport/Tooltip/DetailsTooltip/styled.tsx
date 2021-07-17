import styled from 'styled-components'
import Card from 'components/ui/Card'

export interface DetailsTooltipSCProps {}

export const DetailsTooltipSC = styled(Card)`
  font: normal normal normal 16px/24px Oswald;
  min-height: 152px;
  min-width: 320px;
  letter-spacing: 0.32px;
  color: ${({ theme }) => theme.color.typography.text};
  white-space: nowrap;
  min-height: 152px;

  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    padding: 10px 20px 15px 20px;
  }

  .disabled {
    pointer-events: none;
  }
`
