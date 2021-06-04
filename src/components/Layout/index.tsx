import { CSSProperties, memo, ReactNode, ReactNodeArray, useCallback, useState } from 'react'
import { LayoutSC, LayoutSCProps } from './styled'
import { Col, Row } from 'components/ui/Grid'
import Header from 'components/Header'
import SideBar from 'components/SideBar'
import Footer from 'components/Footer'
import { useEventListener } from 'hooks/useEventListener'

export interface LayoutProps extends LayoutSCProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode | ReactNodeArray
}

function Layout({ className, style, children, ...rest }: LayoutProps) {
  const [viewportWidth, setViewportWidth] = useState(document.documentElement.offsetWidth)
  useEventListener(
    window,
    'resize',
    useCallback(() => setViewportWidth(document.documentElement.offsetWidth), [])
  )

  return (
    <LayoutSC className={className} style={style} {...rest}>
      <Col className={'container'}>
        <Row justify={'center'}>
          <div className={'sideBlock'} style={{ width: 156 + (viewportWidth % 2) / 2 }} />
          <div className={'centerBlock'}>
            <Header />
            {children}
            <Footer />
          </div>
          <SideBar className={'sideBlock'} style={{ width: 156 }} />
        </Row>
      </Col>
      <div className={'gradient'} />
    </LayoutSC>
  )
}

export default memo(Layout)
