import styled from 'styled-components'
export interface ProcessBarSCProps {}

export const ProcessBarSC = styled.div<ProcessBarSCProps>`
  overflow: hidden;
  line-height: 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.processBar.text};
  display: flex;
  text-transform: uppercase;
  font-family: 'Oswald', sans-serif;
  .step {
    max-width: 95px;
    min-width: 95px;
    position: relative;
  }
  .step {
    &:not(:last-child) {
      .token {
        &:after {
          content: '';
          position: absolute;
          width: 90px;
          height: 5px;
          background-color: ${({ theme }) => theme.color.processBar.color};
          border-radius: 10px;
          top: 15.5px;
          margin-left: 10px;
          z-index: -1;
        }
      }
      &.current {
        .token {
          &:after {
            width: 100px;
          }
        }
      }
    }
  }
  .token {
    border-radius: 100%;
    z-index: 1;
    span {
      letter-spacing: 0.28px;
      font-size: 14px;
      line-height: 16px;
    }
  }
  .last {
    .token {
      width: 20px;
      height: 20px;
      margin-top: 8px;
      background-color: ${({ theme }) => theme.color.processBar.color};
    }
    span {
      margin-top: 16px;
    }
  }
  .current {
    .token {
      width: 38px;
      height: 38px;
      background: ${({ theme }) => theme.color.processBar.color};
      &:before {
        content: '';
        height: 18px;
        width: 18px;
        display: block;
        margin-left: 5px;
        margin-top: 5px;
        border-radius: 100%;
        border: 5px solid ${({ theme }) => theme.color.processBar.inner};
        z-index: 2;
      }
    }
    span {
      font-weight: bold;
      letter-spacing: 0.49px;
      margin-top: 6px;
    }
  }
  .next {
    .token {
      width: 20px;
      height: 20px;
      border: 5px solid ${({ theme }) => theme.color.processBar.color};
      background-color: ${({ theme }) => theme.color.processBar.inner};
      margin-top: 8px;
    }
    span {
      margin-top: 16px;
    }
  }
`
