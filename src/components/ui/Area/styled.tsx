import styled from 'styled-components'

export interface AreaSCProps {
  borderColor?: string
}

export const AreaSC = styled.div<AreaSCProps>`
  border: 2px solid ${({ borderColor }) => borderColor};
  display: inline-block;
  padding: 11px 26px 7px;
  border-radius: 5px;
  position: relative;

  .name-wrapper {
    position: absolute;
    background-color: #fff;
    white-space: nowrap;
    padding: 0 10px;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
