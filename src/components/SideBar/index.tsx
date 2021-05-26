import { CSSProperties, memo } from 'react'
import { SideBarSC, SideBarSCProps } from './styled'
import { Col, Row } from 'components/ui/Grid'

export interface SideBarProps extends SideBarSCProps {
  className?: string
  style?: CSSProperties
}

function SideBar({ className, style, ...rest }: SideBarProps) {
  return (
    <SideBarSC className={className} style={style} {...rest}>
      <Col>
        sidebar1
      </Col>
    </SideBarSC>
  )
}

export default memo(SideBar)
