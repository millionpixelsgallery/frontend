import { CSSProperties, memo } from 'react'
import { LayoutSC, LayoutSCProps } from './styled'

export interface LayoutProps extends LayoutSCProps {
  className?: string
  style?: CSSProperties
}

function Layout({ className, style, ...rest }: LayoutProps) {
  return <LayoutSC className={className} style={style} {...rest}></LayoutSC>
}

export default memo(Layout)
