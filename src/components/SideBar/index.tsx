import { CSSProperties, memo } from 'react'
import { SideBarSC, SideBarSCProps } from './styled'
import { Col, Row } from 'components/ui/Grid'
import Text from 'components/ui/Text'
import { margin, marginRight, marginTop } from 'utils/style/indents'
import Burger from 'components/ui/Burger'

export interface SideBarProps extends SideBarSCProps {
  className?: string
  style?: CSSProperties
}

function SideBar({ className, style, ...rest }: SideBarProps) {
  return (
    <SideBarSC className={className} style={style} {...rest}>
      <Col style={margin(173, 0, 0, 50)}>
        <div><Text color='#0B0742' size='16px' letterSpacing='0.56px' lineHeight='30px' weight={500}>PIXELS SOLD</Text></div>
        <div><Text color='#5E72EB' size='24px' letterSpacing='0.84px' lineHeight='30px' weight={700}>145,915</Text></div>
        <div style={marginTop(50)}><Text color='#0B0742' size='16px' letterSpacing='0.56px' lineHeight='30px' weight={500}>NFT CREATED</Text></div>
        <div><Text color='#5E72EB' size='24px' letterSpacing='0.84px' lineHeight='30px' weight={700}>977</Text></div>
        <Row style={marginTop(104)}>
          <Col align='center' style={marginRight(15)}>
            <Text color='#0B0742' size='22px' letterSpacing='0.44px' lineHeight='32px' weight={600}>1px</Text>
            <Row>
              <Text color='#5E72EB' size='12px' letterSpacing='0.24px' lineHeight='17px' weight={600}>0.001</Text>
              <Burger />
            </Row>
          </Col>
          <img src='/assets/Component3.svg'/>
        </Row>
        <Row style={margin(26, 0, 24, 0)}>
          <Col align='center' style={marginRight(15)}>
            <Text color='#0B0742' size='22px' letterSpacing='0.44px' lineHeight='32px' weight={600}>1px</Text>
            <Row>
              <Text color='#5E72EB' size='12px' letterSpacing='0.24px' lineHeight='17px' weight={600}>0.01</Text>
              <Burger />
            </Row>
          </Col>
          <img src='/assets/Component4.svg'/>
        </Row>
        <Row>
          <Col align='center' style={marginRight(15)}>
            <Text color='#0B0742' size='22px' letterSpacing='0.44px' lineHeight='32px' weight={600}>1px</Text>
            <Row>
              <Text color='#5E72EB' size='12px' letterSpacing='0.24px' lineHeight='17px' weight={600}>0.1</Text>
              <Burger />
            </Row>
          </Col>
          <img src='/assets/Component5.svg'/>
        </Row>
      </Col>
    </SideBarSC>
  )
}

export default memo(SideBar)
