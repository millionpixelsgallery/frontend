import { CSSProperties, memo, ReactNode } from 'react'
import { useTheme } from 'styled-components'
import { ByPixelsReviewPixelsSC, ByPixelsReviewPixelsSCProps, CalculateSC } from './styled'
import { Col, Row } from 'components/ui/Grid'
import Title from 'components/ui/Title'
import { marginBottom, marginTop } from 'utils/style/indents'
import { ProductData } from 'components/ByPixels/index'
import Text from 'components/ui/Text'
import Area from 'components/ui/Area'

export interface ByPixelsReviewPixelsProps extends ByPixelsReviewPixelsSCProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  data: ProductData
}

export const Calculate = ({
  data,
  highlight,
}: {
  data: ProductData
  highlight?: string | undefined
}) => (
  <CalculateSC>
    <Row gap={7} align={'center'} style={marginBottom(20)}>
      <Area name={'width'}>
        <Text type={'XL'} color={highlight}>
          {data.width}
          <Text color={highlight} type={'S'}>
            px
          </Text>
        </Text>
      </Area>
      <Text type={'XL'}>X</Text>
      <Area name={'height'}>
        <Text type={'XL'} color={highlight}>
          {data.height}
          <Text color={highlight} type={'S'}>
            px
          </Text>
        </Text>
      </Area>
      <Text type={'XL'}>=</Text>
      <Area name={'TOTAL'}>
        <Text type={'XL'}>{data.height * data.width}</Text>
        <Text type={'S'}>px</Text>
      </Area>
    </Row>
  </CalculateSC>
)

function ByPixelsReviewPixels({
  className,
  style,
  data,
  children,
  ...rest
}: ByPixelsReviewPixelsProps) {
  const theme = useTheme()
  const isReSell = data.index != null
  return (
    <ByPixelsReviewPixelsSC className={className} style={style} {...rest}>
      <Col justify={'between'} className={'full-height'}>
        <Col align={'center'}>
          <Title style={marginBottom(45)}>Review your pixels</Title>
          <Calculate data={data} highlight={'#5E72EB'} />
          <Text type={'MGray'} style={marginBottom(60)}>
            start POSITION:
            <Text type={'M'}>
              {' '}
              X{data.position.x}, Y{data.position.y}
            </Text>
          </Text>
          <Area name={'PRICE'}>
            <div className={'price text-center'}>
              <Text type={'XL'}>{data.price} ETH</Text>
              <Text type={'S'}>+ GAS FEES</Text>
            </div>
          </Area>
          {!isReSell && (
            <Col align={'center'}>
              <Text type={'L'} style={{ textDecoration: 'underline', ...marginTop(45) }}>
                IMPORTANT: After clicking “lock & next”
              </Text>
              <Text type={'L'} weight={600} color={theme.color.typography.title}>
                You’ll need to click “confirm” in your wallet
              </Text>
              <Text type={'L'}>in order to Lock the wanted space and continue the purchase</Text>
            </Col>
          )}
        </Col>

        {children}
      </Col>
    </ByPixelsReviewPixelsSC>
  )
}

export default memo(ByPixelsReviewPixels)
