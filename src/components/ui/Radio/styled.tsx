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

  rect {
    transition: 0.2s;
    stroke-width: 2px;
    stroke: ${({ theme }) => theme.color.radio.off};
    opacity: 0.54;
  }

  circle {
    transition: 0.2s;
    fill: ${({ theme }) => theme.color.radio.on};
    opacity: 0;
  }

  input:checked + svg {
    rect {
      opacity: 1;
      stroke: ${({ theme }) => theme.color.radio.on};
    }

    circle {
      opacity: 1;
    }
  }

  input:disabled + svg {
    rect {
      stroke: #8097b1;
    }

    circle {
      fill: #97adff;
    }
  }
`
