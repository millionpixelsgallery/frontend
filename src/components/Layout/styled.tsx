import styled from 'styled-components'

export interface LayoutSCProps {}

export const LayoutSC = styled.div<LayoutSCProps>`
  width: 100%;  
  
  .container {
    position: relative;
    height: 100%;
  }  

  .centerBlock {
    z-index: 2;
  }    
  
  .square {
    box-sizing: border-box;
    position: relative;
    width: 1000px;
    height: 1000px;
    background: ${({ theme }) => `${theme.color.layout.square.background} 0% 0% no-repeat padding-box`};
    box-shadow: ${({ theme }) => `0px 16px 40px ${theme.color.layout.square.shadow}`};    
    border: ${({ theme }) => `1px solid ${theme.color.layout.square.border}`};
  }
  
  .square333 {
    width: 333px;
    height: 333px;
    background: ${({ theme }) => `${theme.color.layout.square333.background} 0% 0% no-repeat padding-box`};
    position: absolute;
    top: 333px;
    left: 333px;
  }

  .square100 {
    width: 100px;
    height: 100px;
    background: ${({ theme }) => `${theme.color.layout.square100.background} 0% 0% no-repeat padding-box`};
    position: absolute;
    top: 116.5px;
    left: 116.5px;
  }

  .gradient {
    background: ${({ theme }) => theme.color.layout.gradient};
    height: 700px;
    position: absolute;
    bottom: -520px;
    left: 0;
    width: 100%;
    z-index: 1;
    overflow: hidden;
  }
`
