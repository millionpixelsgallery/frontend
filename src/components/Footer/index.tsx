import { CSSProperties, memo } from 'react'
import { FooterSC, FooterSCProps } from './styled'
import { Col, Row } from 'components/ui/Grid'

export interface FooterProps extends FooterSCProps {
  className?: string
  style?: CSSProperties
}

function Footer({ className, style, ...rest }: FooterProps) {
  return (
    <FooterSC className={className} style={style} {...rest}>
      <Row>
        Footer
      </Row>
    </FooterSC>
  )
}

export default memo(Footer)
