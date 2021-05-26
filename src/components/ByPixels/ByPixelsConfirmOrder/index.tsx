import { CSSProperties, memo, ReactNode } from 'react'
import { ByPixelsConfirmOrderSC, ByPixelsConfirmOrderSCProps } from './styled'
import { Col } from 'components/ui/Grid'
import Title from 'components/ui/Title'

export interface ByPixelsConfirmOrderProps extends ByPixelsConfirmOrderSCProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

function ByPixelsConfirmOrder({ className, style, children, ...rest }: ByPixelsConfirmOrderProps) {
  return (
    <ByPixelsConfirmOrderSC className={className} style={style} {...rest}>
      <Col justify={'between'}>
        <Col>
          <Title>CONFIRM YOUR ORDER</Title>
        </Col>
        {children}
      </Col>
    </ByPixelsConfirmOrderSC>
  )
}

export default memo(ByPixelsConfirmOrder)
