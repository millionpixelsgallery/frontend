import styled from 'styled-components'

export interface NavLinkSCProps {}

export const NavLinkSC = styled.div<NavLinkSCProps>`
  display: inline-block;

  .children {
    text-transform: uppercase;
    letter-spacing: 0.63px;
    font: normal normal normal ${({ theme }) => theme.pxToRem(18) + '/' + theme.pxToRem(26)};
    transition: 0.2s;
    padding: 0 3px;
  }

  .border {
    width: 0;
    transition: 0.5s;
    border-radius: 40px;
    margin: 5px auto auto;
    height: ${({ theme }) => theme.pxToRem(5)};
  }

  .active {
    .children {
      font-weight: 600;
      letter-spacing: 0.36px;
    }

    .border {
      width: 100%;
      transition: 0.5s;
      background-color: ${({ theme }) => theme.component.NavLink.activeLine};
    }
  }

  .item {
    &:not(.active) {
      &:hover {
        .border {
          width: 100%;
          background-color: ${({ theme }) => theme.component.NavLink.hoverLine};
        }
      }
    }
  }
`
