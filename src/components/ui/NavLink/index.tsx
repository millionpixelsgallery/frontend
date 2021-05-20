import { CSSProperties, memo, ReactNode } from 'react'
import { NavLinkSC, NavLinkSCProps } from './styled'
import cn from 'classnames'

export interface NavLinkProps extends NavLinkSCProps {
  className?: string
  style?: CSSProperties
  active?: boolean
  children: ReactNode
}

function NavLink({ className, style, active = false, children, ...rest }: NavLinkProps) {
  return (
    <NavLinkSC className={className} style={style} {...rest}>
      <div className={cn('item', { active: active })}>
        <div className={'children'}>{children}</div>
        <div className={'border'} />
      </div>
    </NavLinkSC>
  )
}

export default memo(NavLink)
