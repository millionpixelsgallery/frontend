import styled from 'styled-components'

export interface ModalOverlaySCProps {}

export const ModalOverlaySC = styled.div<ModalOverlaySCProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.color.modal.bg};
  display: flex;
  align-items: center;
  justify-content: center;
`

export interface ModalSCProps {}

export const ModalSC = styled.div<ModalSCProps>`
  background: #ffffff;
  box-sizing: border-box;
  position: inherit;
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
`