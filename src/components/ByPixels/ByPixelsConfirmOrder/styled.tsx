import styled from 'styled-components'

export interface ByPixelsConfirmOrderSCProps {}

export const ByPixelsConfirmOrderSC = styled.div<ByPixelsConfirmOrderSCProps>`
  height: 100%;
  .full-height {
    height: 100%;
  }
  .photo-area {
    width: 319px;
    height: 319px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 290px;
      max-height: 290px;
    }
  }
  .price {
    width: 310px;
    padding: 0;
  }
`
