import { CSSProperties, memo, useMemo } from 'react'
import { DetailsRowSC, PixelsDetailsRowSC, PixelsDetailsRowSCProps } from './styled'
import { PixelsData } from 'components/PixelsList/index'
import { Col, Row } from 'components/ui/Grid'
import PixelsDimensions from 'components/PixelsDimensions'
import Text from 'components/ui/Text'
import { emptyString } from 'utils/format/phrases'
import Button from 'components/ui/Button'

export interface PixelsDetailsRowProps extends PixelsDetailsRowSCProps {
  data: PixelsData
  onEdit: () => void
  onSell: () => void
  className?: string
  style?: CSSProperties
}

function DetailsRow({ label, value }: { label: string; value: string }) {
  return (
    <DetailsRowSC>
      <Text>
        <span className='label'>{label}:</span> {value}
      </Text>
    </DetailsRowSC>
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
  const isOnSale = useMemo(() => Boolean(data.saleTimer), [data.saleTimer])

  return (
    <PixelsDetailsRowSC className={className} style={style} {...rest}>
      <Col>
        <Row>
          <Row gap={25}>
            <div className='your-photo'>
              <div>Your photo</div>
              [PHOTO]
            </div>
            <Col className='pixels-details' gap={20}>
              <PixelsDimensions width={data.width} height={data.height} />
              <DetailsRow label='Start position' value={positionString} />
              <DetailsRow label='Your link' value={data.link ?? emptyString} />
              <DetailsRow label='Your title' value={data.title ?? emptyString} />
            </Col>
          </Row>
          <Row justify='end'>
            {isOnSale && (
              <div className='timer'>
                <div>On sale - time left:</div>
                {data.saleTimer}
              </div>
            )}
          </Row>
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
