import { CSSProperties, memo } from 'react'
import { SideBarSC, SideBarSCProps } from './styled'
import { Col, Row } from 'components/ui/Grid'
import { margin, marginRight, marginTop } from 'utils/style/indents'
import InfoBlock from 'components/ui/InfoBlock'
import InfoBlockPx from 'components/ui/InfoBlockPx'

export interface SideBarProps extends SideBarSCProps {
  className?: string
  style?: CSSProperties
}

function SideBar({ className, style, ...rest }: SideBarProps) {
  return (
    <SideBarSC className={className} style={style} {...rest}>
      <Col style={margin(135, 0, 0, 50)}>
        <InfoBlock  title='PIXELS SOLD' children='145,915'/>
        <InfoBlock  title='NFT CREATED' children='977' style={marginTop(50)}/>
        <Row style={marginTop(104)}>
          <InfoBlockPx title='1px' children='0.001' style={marginRight(15)} />
          <img src='/assets/Component3.svg'/>
        </Row>
        <Row style={margin(26, 0, 24, 0)}>
          <InfoBlockPx title='1px' children='0.01' style={marginRight(15)} />
          <img src='/assets/Component4.svg'/>
        </Row>
        <Row>
          <InfoBlockPx title='1px' children='0.1' style={marginRight(15)} />
          <img src='/assets/Component5.svg'/>
        </Row>
      </Col>
    </SideBarSC>
  )
}

export default memo(SideBar)
