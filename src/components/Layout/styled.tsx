import styled from 'styled-components'

export interface LayoutSCProps {}

export const LayoutSC = styled.div<LayoutSCProps>`
  position: relative;
  min-height: 100vh;
  padding: 42px 0 25px;

  .container {
    position: relative;
    z-index: 2;
    height: 100%;
  }

  .sideBlock {
    width: 156px;
  }

  .sideBlockRight {
    width: auto;
  }

  .gradient {
    background: ${({ theme }) => theme.color.layout.gradient};
    position: absolute;
    z-index: 1;
    top: 680px;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .centerBlock {
    width: 1000px;
  }
`
