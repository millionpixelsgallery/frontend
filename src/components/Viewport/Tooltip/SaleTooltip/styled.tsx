import styled from 'styled-components'
import Card from 'components/ui/Card'

export interface SaleTooltipSCProps {}

export const SaleTooltipSC = styled(Card)`
  min-height: 189px;
  min-width: 320px;
  font: normal normal normal 16px/24px Oswald;
  letter-spacing: 0.32px;
  color: ${({ theme }) => theme.color.typography.text};
  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
  }

  .sm {
    font: normal normal normal 14px/21px Oswald;
    letter-spacing: 0.28px;
    color: #0b074280;
  }

  .lg {
    font: normal normal 600 22px/21px Oswald;
    letter-spacing: 0.44px;
    color: #0b0742;
  }

  .disabled {
    pointer-events: none;
  }
`
