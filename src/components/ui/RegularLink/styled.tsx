import styled from 'styled-components'
import { LinkColors } from 'components/ui/Link'

export interface RegularLinkSCProps {
  $underlined?: boolean
  $bold?: boolean
  $colors?: LinkColors
}

export const RegularLinkSC = styled.a<RegularLinkSCProps>`
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
