import { CSSProperties, memo } from 'react'
import { SideBarSC, SideBarSCProps } from './styled'
import { Col, Row } from 'components/ui/Grid'
import Text from 'components/ui/Text'
import { margin, marginRight, marginTop } from 'utils/style/indents'
import SocialIcon from 'components/ui/SocialIcon'

export interface SideBarProps extends SideBarSCProps {
  className?: string
  style?: CSSProperties
}

function SideBar({ className, style, ...rest }: SideBarProps) {
  return (
    <SideBarSC className={className} style={style} {...rest}>
      <Col style={margin(173, 0, 0, 50)}>
        <Text>
          <div>
            PIXELS SOLD
          </div>
          <div>
            145,915
          </div>
          <div style={marginTop(50)}>
            NFT CREATED
          </div>
          <div>
            977
          </div>
        </Text>
        <Row>
          <Col>
            <Text>1px</Text>
            <Row>
              <Text>0.001</Text>
              <Col>
                <div className={'burger'}></div>
                <div className={'burger'}></div>
                <div className={'burger'}></div>
              </Col>
            </Row>
          </Col>
          <img src='/assets/Component3.svg'/>
        </Row>
        <Row>
          <Col>
            <Text>1px</Text>
            <Row>
              <Text>0.001</Text>
              <Col>
                <div className={'burger'}></div>
                <div className={'burger'}></div>
                <div className={'burger'}></div>
              </Col>
            </Row>
          </Col>
          <img src='/assets/Component4.svg'/>
        </Row>
        <Row>
          <Col>
            <Text>1px</Text>
            <Row>
              <Text>0.001</Text>
              <Col>
                <div className={'burger'}></div>
                <div className={'burger'}></div>
                <div className={'burger'}></div>
              </Col>
            </Row>
          </Col>
          <img src='/assets/Component5.svg'/>
        </Row>
      </Col>
    </SideBarSC>
  )
}

export default memo(SideBar)
