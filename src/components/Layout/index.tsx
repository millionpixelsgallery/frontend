import { CSSProperties, memo } from 'react'
import { LayoutSC, LayoutSCProps } from './styled'
import { Col, Row } from 'components/ui/Grid'
import Header from 'components/Header'
import SideBar from 'components/SideBar'
import Footer from 'components/Footer'

export interface LayoutProps extends LayoutSCProps {
  className?: string
  style?: CSSProperties
}

function Layout({ className, style, ...rest }: LayoutProps) {
  return (
    <LayoutSC className={className} style={style} {...rest}>
        <Col align="center" className={'container'}>
          <Row>
            <div className={'centerBlock'}>
              <Header />
              <div className={'square'}>
                <div className={'square333'}>
                  <div className={'square100'}>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
            <SideBar />
          </Row>
        </Col>
      <div className={'gradient'}></div>
    </LayoutSC>
  )
}

export default memo(Layout)
