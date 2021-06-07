import { CSSProperties, memo, useMemo, useState } from 'react'
import { ImgDivSC, PixelsDetailsRowSC, PixelsDetailsRowSCProps } from './styled'
import { Col, Row } from 'components/ui/Grid'
import PixelsDimensions from 'components/PixelsDimensions'
import Text from 'components/ui/Text'
import { emptyString } from 'utils/format/phrases'
import Button from 'components/ui/Button'
import Timer from 'components/Timer'
import { unixToDateTime } from 'utils/format/datetime'
import Area from 'components/ui/Area'
import Modal from 'components/ui/Modal'
import { Pixels } from 'lib/web3connect'
import EditPixels from 'components/EditPixels'

export interface PixelsDetailsRowProps extends PixelsDetailsRowSCProps {
  data: Pixels
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
  const { area, sale, image: dataImg } = data
  const [x, y, width, height] = area
  const { title, link, image } = dataImg || {}
  const positionString = useMemo(() => `X${x}, Y${y}`, [x, y])
  const isOnSale = useMemo(() => Boolean(sale?.end), [sale?.end])
  const [step, setStep] = useState(0)
  const [disabledControlButtons, setDisabledControlButtons] = useState(false)
  const onBack = () => {
    setStep((step) => step - 1)
  }

  return (
    <PixelsDetailsRowSC className={className} style={style} {...rest}>
      <Col>
        <Row gap={25}>
          <Area className={'photo-area'} name={'Your photo'}>
            {image ? <ImgDivSC className='image' $src={image} /> : 'No image'}
          </Area>
          <Col className='details-col' gap={20}>
            <Row gap={10} justify='between'>
              <PixelsDimensions width={width} height={height} />
              {isOnSale && <Timer name='On sale - Time Left:' end={unixToDateTime(sale?.end!)} />}
            </Row>
            <Col gap={20}>
              <DetailsRow label='Start position' value={positionString} />
              <DetailsRow label='Your link' value={link ?? emptyString} />
              <DetailsRow label='Your title' value={title ?? emptyString} />
            </Col>
          </Col>
        </Row>
        <Row justify='end' gap={20}>
          <Modal
            trigger={
              <Button type='outlined_orange' onClick={onEdit}>
                Edit
              </Button>
            }
            onBack={step ? onBack : undefined}
            disabledControlButtons={disabledControlButtons}
            component={EditPixels}
            componentProps={{
              step,
              onChangeStep: setStep,
              onChangeDisabledControlButtons: setDisabledControlButtons,
              data: {
                width,
                height,
                position: {
                  x,
                  y,
                },
                price: 6,
              },
              image: {
                title,
                link,
                image,
              },
            }}
          />
          <Modal
            trigger={
              <Button type='default' onClick={onSell} disabled={isOnSale}>
                Sell
              </Button>
            }
          />
        </Row>
      </Col>
    </PixelsDetailsRowSC>
  )
}

export default memo(PixelsDetailsRow)
