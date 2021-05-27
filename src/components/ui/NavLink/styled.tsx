import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export interface NavLinkSCProps {
  borderWidth?: number
}

export const NavLinkSC = styled(NavLink)<NavLinkSCProps>`
  display: inline-block;
  color: inherit;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.63px;
  font: normal normal normal 18px/26px;
  transition: 0.3s;
  padding: 0 3px;
  width: ${({ borderWidth }) => (borderWidth !== undefined ? borderWidth + 'px' : 'auto')};
  text-align: center;
  &::after {
    content: '';
    width: 0;
    transition: 0.3s;
    border-radius: 40px;
    margin: 5px auto auto;
    display: block;
    height: 5px;
  }

  &.active {
    font-weight: 600;
    letter-spacing: 0.63px;
    &::after {
      content: '';
      width: 100%;
      transition: 0.3s;
      background-color: ${({ theme }) => theme.color.NavLink.activeLine};
    }
  }

  &:not(.active) {
    &:hover {
      &::after {
        content: '';
        width: 100%;
        background-color: ${({ theme }) => theme.color.NavLink.hoverLine};
      }
    }
  }
`
