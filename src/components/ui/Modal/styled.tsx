import styled, { createGlobalStyle } from 'styled-components'

export interface ModalOverlaySCProps {}

export const ModalOverlaySC = styled.div<ModalOverlaySCProps>`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.color.modal.bg};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const GlobalModalStyles = createGlobalStyle`
  body {
    position: fixed;
  }
`

export interface ModalSCProps {}

export const ModalSC = styled.div<ModalSCProps>`
  background: #ffffff;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 8px 20px #0b074233;
  border: 5px solid ${({ theme }) => theme.color.modal.border};
  border-radius: 28px;

  .back {
    position: absolute;
    top: 25px;
    left: 25px;
    fill: none;
    stroke: #5e72eb;
    stroke-width: 3px;
  }

  .close {
    position: absolute;
    right: 25px;
    top: 28px;
    fill: #5e72eb;
  }

  button:disabled {
    &.back {
      stroke: #9c9c9c;
    }

    &.close {
      fill: #9c9c9c;
    }
  }
`
