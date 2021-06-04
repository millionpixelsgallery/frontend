import {
  CSSProperties,
  memo,
  ReactNode,
  ReactNodeArray,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'
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

  useLayoutEffect(() => setViewportWidth(document.documentElement.offsetWidth), [])

  return (
    <LayoutSC
      className={className}
      style={{
        paddingLeft: viewportWidth % 2,
        ...style,
      }}
      {...rest}
    >
      <Col className={'container'}>
        <Row justify={'center'}>
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
