import styled from 'styled-components'
import Card from 'components/ui/Card'

export const BuyTooltipSC = styled(Card)`
  min-width: 320px;
  min-height: 180px;
  text-transform: uppercase;
  text-align: center;

  .main {
    font: normal normal 600 22px/24px Oswald;
    letter-spacing: 0.44px;
    color: #0b0742;
  }

  .secondary {
    font: normal normal normal 16px/24px Oswald;
    letter-spacing: 0.32px;
    color: #0b074280;

    &.active {
      color: #0b0742;
    }
  }

  .warn {
    font: normal normal 600 22px/32px Oswald;
    letter-spacing: 0.44px;
    color: #fe504f;
  }

  &.error {
    .main,
    .secondary {
      color: rgba(11, 7, 66, 0.35);
    }
  }
`
