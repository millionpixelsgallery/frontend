import { CSSProperties, memo, ReactNode } from 'react'
import { ByPixelsReviewPixelsSC, ByPixelsReviewPixelsSCProps } from './styled'
import { Col } from 'components/ui/Grid'
import Title from 'components/ui/Title'

export interface ByPixelsReviewPixelsProps extends ByPixelsReviewPixelsSCProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

function ByPixelsReviewPixels({ className, style, children, ...rest }: ByPixelsReviewPixelsProps) {
  return (
    <ByPixelsReviewPixelsSC className={className} style={style} {...rest}>
      <Col justify={'between'}>
        <Col>
          <Title>Review your pixels</Title>
        </Col>
        {children}
      </Col>
    </ByPixelsReviewPixelsSC>
  )
}

export default memo(ByPixelsReviewPixels)
