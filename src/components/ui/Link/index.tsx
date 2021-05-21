import { AnchorHTMLAttributes, CSSProperties, memo } from 'react'
import { LinkSC } from './styled'
import { LinkProps as ReactRouterLinkProps } from 'react-router-dom'
import theme from 'lib/theme'

export type LinkTypes = 'primary' | 'secondary' | 'white'
export type LinkColors = {
  primary: string
  hover: string
  active: string
  visited: string
}

export type LinkProps = {
  className?: string
  style?: CSSProperties
  type?: LinkTypes
  underlined?: boolean
  bold?: boolean
  colors?: LinkColors
} & (
  | ({
      native?: false
    } & ReactRouterLinkProps)
  | ({
      native: true
    } & AnchorHTMLAttributes<HTMLAnchorElement>)
)

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
  native,
  ...rest
}: LinkProps) {
  if (native) {
    return (
      <LinkSC
        as='a'
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

  return (
    <LinkSC
      $bold={bold ?? boldDefaults[type]}
      $colors={colors ?? colorsDefaults[type]}
      $underlined={underlined ?? underlineDefaults[type]}
      className={className}
      style={style}
      {...(rest as ReactRouterLinkProps)}
    >
      {children}
    </LinkSC>
  )
}

export default memo(Link)
