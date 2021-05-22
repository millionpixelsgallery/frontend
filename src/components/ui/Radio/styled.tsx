import styled from 'styled-components'

export interface RadioSCProps {}

export const RadioSC = styled.div<RadioSCProps>`
  display: inline-block;
  position: relative;
  font-size: 1px;

  input {
    cursor: pointer;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
  }

  input[disabled] + svg {
    rect {
      stroke: #8097b1;
    }

    circle {
      fill: #97adff;
    }
  }
`
