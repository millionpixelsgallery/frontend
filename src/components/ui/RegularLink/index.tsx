import { CSSProperties, memo } from 'react'
import { RegularLinkSC } from './styled'
import {
  boldDefaults,
  colorsDefaults,
  LinkColors,
  LinkTypes,
  underlineDefaults,
} from 'components/ui/Link'

export interface RegularLinkProps extends Omit<JSX.IntrinsicElements['a'], 'ref'> {
  className?: string
  style?: CSSProperties
  type?: LinkTypes
  underlined?: boolean
  bold?: boolean
  colors?: LinkColors
}

function RegularLink({
  type = 'primary',
  underlined,
  bold,
  colors,
  className,
  style,
  children,
  ...rest
}: RegularLinkProps) {
  return (
    <RegularLinkSC
      $bold={bold ?? boldDefaults[type]}
      $colors={colors ?? colorsDefaults[type]}
      $underlined={underlined ?? underlineDefaults[type]}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </RegularLinkSC>
  )
}

export default memo(RegularLink)
