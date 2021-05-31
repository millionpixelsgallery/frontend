import { CSSProperties, memo, useMemo } from 'react'
import { ImgDivSC, PixelsDetailsRowSC, PixelsDetailsRowSCProps } from './styled'
import { PixelsData } from 'components/PixelsList/index'
import { Col, Row } from 'components/ui/Grid'
import PixelsDimensions from 'components/PixelsDimensions'
import Text from 'components/ui/Text'
import { emptyString } from 'utils/format/phrases'
import Button from 'components/ui/Button'
import Timer from 'components/Timer'
import { unixToDateTime } from 'utils/format/datetime'
import Area from 'components/ui/Area'

export interface PixelsDetailsRowProps extends PixelsDetailsRowSCProps {
  data: PixelsData
  onEdit?: () => void
  onSell?: () => void
  className?: string
  style?: CSSProperties
}

function DetailsRow({ label, value }: { label: string; value: string }) {
  return (
    <Text className='details-row' type='M'>
      <Text type='MGray'>{label}:</Text> {value}
    </Text>
  )
}

function PixelsDetailsRow({
  data,
  onEdit,
  onSell,
  className,
  style,
  ...rest
}: PixelsDetailsRowProps) {
  const positionString = useMemo(
    () => `X${data.position.x}, Y${data.position.y}`,
    [data.position.x, data.position.y]
  )
  const isOnSale = useMemo(() => Boolean(data.saleUntil), [data.saleUntil])

  return (
    <PixelsDetailsRowSC className={className} style={style} {...rest}>
      <Col>
        <Row gap={25}>
          <Area className={'photo-area'} name={'Your photo'}>
            {data.image ? <ImgDivSC className='image' $src={data.image} /> : 'No image'}
          </Area>
          <Col className='details-col' gap={20}>
            <Row gap={10} justify='between'>
              <PixelsDimensions width={data.width} height={data.height} />
              {isOnSale && (
                <Timer name='On sale - Time Left:' end={unixToDateTime(data.saleUntil!)} />
              )}
            </Row>
            <Col gap={20}>
              <DetailsRow label='Start position' value={positionString} />
              <DetailsRow label='Your link' value={data.link ?? emptyString} />
              <DetailsRow label='Your title' value={data.title ?? emptyString} />
            </Col>
          </Col>
        </Row>
        <Row justify='end' gap={20}>
          <Button type='outlined_orange' onClick={onEdit}>
            Edit
          </Button>
          <Button type='default' onClick={onSell} disabled={isOnSale}>
            Sell
          </Button>
        </Row>
      </Col>
    </PixelsDetailsRowSC>
  )
}

export default memo(PixelsDetailsRow)
