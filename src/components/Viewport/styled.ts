import styled from 'styled-components'

export const ViewportSC = styled.div`
  position: relative;
  overflow: hidden;
  width: 1000px;
  height: 1000px;
  background-color: #f8f8f8;
  box-shadow: 0 16px 40px #0b074233;
  border: 1px solid #5e72eb;
`

export const ViewportContentSC = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`
