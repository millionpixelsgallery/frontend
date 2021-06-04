import { CSSProperties, memo } from 'react'
import { PixelsDimensionsSC, PixelsDimensionsSCProps } from './styled'
import Area from 'components/ui/Area'
import Text from 'components/ui/Text'

export interface PixelsDimensionsProps extends PixelsDimensionsSCProps {
  width: number
  height: number
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
    <PixelsDimensionsSC className={className} align='center' style={style} gap={gap} {...rest}>
      <Area name='Width'>
        <span className='bold-text'>{width}</span>
        <Text type='S'>PX</Text>
      </Area>
      <div className='bold-text'>X</div>
      <Area name='Height'>
        <span className='bold-text'>{height}</span>
        <Text type='S'>PX</Text>
      </Area>
      <div className='bold-text'>=</div>
      <Area name='Total'>
        <span className='bold-text'>{totalArea}</span>
        <Text type='S'>PX</Text>
      </Area>
    </PixelsDimensionsSC>
  )
}

export default memo(PixelsDimensions)
