import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { LinkColors } from 'components/ui/Link/index'

export interface LinkSCProps {
  $underlined?: boolean
  $bold?: boolean
  $colors?: LinkColors
}

export const LinkSC = styled(Link)<LinkSCProps>`
  text-decoration: ${({ $underlined }) => ($underlined ? 'underline' : 'inherit')};
  font-weight: ${({ $bold }) => ($bold ? '600' : 'inherit')};
  color: ${({ $colors }) => ($colors && $colors.primary ? $colors.primary : 'inherit')};

  &:hover {
    color: ${({ $colors }) => ($colors && $colors.hover ? $colors.hover : 'inherit')};
  }

  &:active {
    color: ${({ $colors }) => ($colors && $colors.active ? $colors.active : 'inherit')};
  }

  &:visited {
    color: ${({ $colors }) => ($colors && $colors.visited ? $colors.visited : 'inherit')};
  }
`
