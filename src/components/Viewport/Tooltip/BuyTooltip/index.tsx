import { memo, useCallback, useEffect, useRef, useState } from 'react'
import Button from 'components/ui/Button'
import { Col } from 'components/ui/Grid'
import { margin } from 'utils/style/indents'
import Modal from 'components/ui/Modal'
import ByPixels from 'components/ByPixels'
import { Web3Connect } from 'lib/web3connect'
import cn from 'classnames'
import { BuyTooltipSC } from 'components/Viewport/Tooltip/BuyTooltip/styled'

export interface BuyTooltipProps {
  x: number
  y: number
  width: number
  height: number
}

function BuyTooltip({ x, y, width, height }: BuyTooltipProps) {
  const [step, setStep] = useState(1)
  const [disabledControlButtons, setDisabledControlButtons] = useState(false)
  const handleBack = useCallback(() => {
    setStep((step) => step - 1)
  }, [])

  const [price, setPrice] = useState({
    loading: true,
    value: '',
    isAvailable: true,
  })

  const debounceRef = useRef<any>()
  useEffect(() => {
    clearTimeout(debounceRef.current)
    let timer = (debounceRef.current = setTimeout(async () => {
      setPrice({
        loading: true,
        value: '',
        isAvailable: true,
      })
      const [res] = await Promise.all([
        await Web3Connect.getPixelsCost([x, y, width, height]).catch((e) => {
          console.warn(e)
          return null
        }),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ])
      if (debounceRef.current !== timer) return
      setPrice({
        loading: false,
        value: res?.format.replace(/\.?0+$/, '') ?? '',
        isAvailable: !!res?.isAvailable,
      })
    }, 600))
  }, [x, y, width, height])

  const handleVisibilityChange = useCallback((visibility: boolean) => {
    if (!visibility) setStep(1)
  }, [])

  return (
    <BuyTooltipSC
      className={cn({
        error: !price.isAvailable,
      })}
      type={price.isAvailable ? 'default' : 'error'}
    >
      <Col align='center'>
        <div>
          <div className='main'>
            {width} <span className='secondary'>x</span> {height}{' '}
            <span className='secondary'>=</span> {width * height} PIXELS
          </div>
          <div className='secondary'>
            START POSITION:{' '}
            <span className='secondary active'>
              X{x}, Y{y}
            </span>
          </div>
          <div className='secondary' style={margin(10, 0, 20, 0)}>
            {price.loading ? (
              <span className='main'>Loading...</span>
            ) : (
              <>
                PRICE: <span className='main'>{price.value || '0'} ETH</span> + GAS FEES
              </>
            )}
          </div>
        </div>
        <div>
          {price.isAvailable ? (
            <Modal
              trigger={
                <Button size={'md'} width={148} disabled={price.loading}>
                  Buy
                </Button>
              }
              onBack={step ? handleBack : undefined}
              component={ByPixels}
              disabledControlButtons={disabledControlButtons}
              onVisibilityChange={handleVisibilityChange}
              componentProps={{
                firstBuy: true,
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
                  price: price.value,
                },
              }}
            />
          ) : (
            <span className='warn'>NFT isn’t available</span>
          )}
        </div>
      </Col>
    </BuyTooltipSC>
  )
}

export default memo(BuyTooltip)
