import { CSSProperties, memo, ReactNode } from 'react'
import { NavLinkSC, NavLinkSCProps } from './styled'

export interface NavLinkProps extends NavLinkSCProps {
  className?: string
  style?: CSSProperties
  children: ReactNode
  to: string
}

function NavLink({ className, style, children, ...rest }: NavLinkProps) {
  return (
    <NavLinkSC className={className} style={style} activeClassName='active' {...rest}>
      <div className={'children'}>{children}</div>
    </NavLinkSC>
  )
}

export default memo(NavLink)
