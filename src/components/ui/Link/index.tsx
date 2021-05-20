import { ComponentProps, CSSProperties, memo } from 'react'
import { LinkSC } from './styled'
import { Link as ReactRouterLink } from 'react-router-dom'
import theme from 'lib/theme'

export type LinkTypes = 'primary' | 'secondary' | 'white'
export type LinkColors = {
  primary: string
  hover: string
  active: string
  visited: string
}

export interface LinkProps extends ComponentProps<typeof ReactRouterLink> {
  className?: string
  style?: CSSProperties
  type?: LinkTypes
  underlined?: boolean
  bold?: boolean
  colors?: LinkColors
}

export const underlineDefaults: { [key in LinkTypes]: boolean } = {
  primary: true,
  secondary: true,
  white: false,
}

export const boldDefaults: { [key in LinkTypes]: boolean } = {
  primary: false,
  secondary: false,
  white: false,
}

export const colorsDefaults: { [key in LinkTypes]: LinkColors } = {
  primary: {
    primary: theme.color.link.primaryPrimary,
    hover: theme.color.link.primaryHover,
    active: theme.color.link.primaryActive,
    visited: theme.color.link.primaryVisited,
  },
  secondary: {
    primary: theme.color.link.secondaryPrimary,
    hover: theme.color.link.secondaryHover,
    active: theme.color.link.secondaryActive,
    visited: theme.color.link.secondaryVisited,
  },
  white: {
    primary: theme.color.link.whitePrimary,
    hover: theme.color.link.whiteHover,
    active: theme.color.link.whiteActive,
    visited: theme.color.link.whiteVisited,
  },
}

function Link({
  type = 'primary',
  underlined,
  bold,
  colors,
  className,
  style,
  children,
  ...rest
}: LinkProps) {
  return (
    <LinkSC
      $bold={bold ?? boldDefaults[type]}
      $colors={colors ?? colorsDefaults[type]}
      $underlined={underlined ?? underlineDefaults[type]}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </LinkSC>
  )
}

export default memo(Link)
