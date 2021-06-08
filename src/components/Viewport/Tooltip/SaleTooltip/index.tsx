import { CSSProperties, memo, useCallback, useMemo, useState } from 'react'
import { SaleTooltipSC, SaleTooltipSCProps } from 'components/Viewport/Tooltip/SaleTooltip/styled'
import { usePixelsController } from 'hooks/usePixels'
import { marginBottom, marginTop } from 'utils/style/indents'
import Link from 'components/ui/Link'
import Button from 'components/ui/Button'
import { Row } from 'components/ui/Grid'
import ByPixels from 'components/ByPixels'
import Modal from 'components/ui/Modal'
import { useApiMethods } from 'hooks/useApi'

export interface SaleTooltipProps extends SaleTooltipSCProps {
  className?: string
  style?: CSSProperties
  x: number
  y: number
}

function SaleTooltip({ className, style, x, y, ...rest }: SaleTooltipProps) {
  const { pixels } = usePixelsController()
  const pixel = useMemo(
    () => pixels?.find((pixel) => pixel.area[0] === x && pixel.area[1] === y),
    [pixels]
  )
  const [step, setStep] = useState(1)
  const [disabledControlButtons, setDisabledControlButtons] = useState(false)
  const handleBack = useCallback(() => {
    setStep((step) => step - 1)
  }, [])
  const methods = useApiMethods()

  return (
    <SaleTooltipSC className={className} style={style} type='success' title='for sale!' {...rest}>
      <div style={marginBottom(8)}>{pixel?.image?.title || 'No title'}</div>
      <Link
        href={pixel?.image?.link || '#'}
        native
        target={pixel?.image?.link ? '_blank' : undefined}
      >
        {pixel?.image?.link || 'No link'}
      </Link>
      <div className='lg' style={marginTop(6)}>
        <span className='sm'>
          pixels: {pixel?.area[2]} x {pixel?.area[3]} =
        </span>{' '}
        {pixel?.area[2]! * pixel?.area[3]!} PX
      </div>
      <Row justify='between' align='center' style={marginTop(5)}>
        <div className='lg'>
          <span className='sm'>Price:</span> {pixel?.sale?.price} ETH
        </div>
        <Modal
          trigger={
            <Button
              className='buy'
              width={96}
              size='sm'
              hidden={pixel?.owner === methods?.getAccount()}
            >
              Buy
            </Button>
          }
          onBack={step ? handleBack : undefined}
          component={ByPixels}
          disabledControlButtons={disabledControlButtons}
          componentProps={{
            step,
            onChangeStep: setStep,
            onChangeDisabledControlButtons: setDisabledControlButtons,
            data: {
              width: pixel?.area[2],
              height: pixel?.area[3],
              position: {
                x: pixel?.area[0],
                y: pixel?.area[1],
              },
              price: pixel?.sale?.price,
              index: pixel?.index,
            },
          }}
        />
      </Row>
    </SaleTooltipSC>
  )
}

export default memo(SaleTooltip)
