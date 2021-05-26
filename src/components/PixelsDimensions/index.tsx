import { CSSProperties, memo } from 'react'
import { PixelsDimensionsSC, PixelsDimensionsSCProps } from './styled'
import { PixelsData } from 'components/PixelsList'

export interface PixelsDimensionsProps extends PixelsDimensionsSCProps {
  width: PixelsData['width']
  height: PixelsData['height']
  className?: string
  style?: CSSProperties
}

function PixelsDimensions({
  height,
  width,
  gap = 7,
  className,
  style,
  ...rest
}: PixelsDimensionsProps) {
  const totalArea = height * width

  return (
    <PixelsDimensionsSC className={className} style={style} {...rest}>
      <div className='width'>
        <div>Width</div>
        <div>{height}px</div>
      </div>
      <div>X</div>
      <div className='height'>
        <div>Height</div>
        <div>{width}px</div>
      </div>
      <div>=</div>
      <div className='total-area'>
        <div>Total</div>
        <div>{totalArea}px</div>
      </div>
    </PixelsDimensionsSC>
  )
}

export default memo(PixelsDimensions)
