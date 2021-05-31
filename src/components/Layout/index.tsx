import { CSSProperties, memo, ReactNode, ReactNodeArray } from 'react'
import { LayoutSC, LayoutSCProps } from './styled'
import { Col, Row } from 'components/ui/Grid'
import Header from 'components/Header'
import SideBar from 'components/SideBar'
import Footer from 'components/Footer'

export interface LayoutProps extends LayoutSCProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode | ReactNodeArray
}

function Layout({ className, style, children, ...rest }: LayoutProps) {
  return (
    <LayoutSC className={className} style={style} {...rest}>
      <Col align='center' className={'container'}>
        <Row>
          <div className={'sideBlock'} />
          <div className={'centerBlock'}>
            <Header />
            {children}
            <Footer />
          </div>
          <SideBar className={'sideBlock'} />
        </Row>
      </Col>
      <div className={'gradient'} />
    </LayoutSC>
  )
}

export default memo(Layout)
