import { memo } from 'react'
import { SelectSC, SelectSCProps } from './styled'

export interface SelectProps extends SelectSCProps {
  x: number
  y: number
  width: number
  height: number
  scale?: number
}

function Select({ x, y, width, height, scale = 1 }: SelectProps) {
  const strokeWidth = 1 / scale
  const resizeRectWidth = 10 / scale
  const boxTranslate = `translate(-${resizeRectWidth / 2 - strokeWidth / 2}, -${
    resizeRectWidth / 2 - strokeWidth / 2
  })`

  return (
    <SelectSC
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      overflow={'visible'}
    >
      <rect
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        width={width - strokeWidth}
        height={height - strokeWidth}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#eeeeee'
        fillOpacity={0.3}
      />

      <rect
        x={0}
        y={0}
        width={resizeRectWidth}
        height={resizeRectWidth}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#ffffff'
        transform={boxTranslate}
      />
      <rect
        x={'100%'}
        y={0}
        width={resizeRectWidth}
        height={resizeRectWidth}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#ffffff'
        transform={boxTranslate}
      />
      <rect
        x={0}
        y={'100%'}
        width={resizeRectWidth}
        height={resizeRectWidth}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#ffffff'
        transform={boxTranslate}
      />
      <rect
        x={'100%'}
        y={'100%'}
        width={resizeRectWidth}
        height={resizeRectWidth}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#ffffff'
        transform={boxTranslate}
      />

      <rect
        x={'50%'}
        y={0}
        width={resizeRectWidth}
        height={resizeRectWidth}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#ffffff'
        transform={boxTranslate}
        visibility={width * scale > 25 ? 'visible' : 'hidden'}
      />
      <rect
        x={'50%'}
        y={'100%'}
        width={resizeRectWidth}
        height={resizeRectWidth}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#ffffff'
        transform={boxTranslate}
        visibility={width * scale > 25 ? 'visible' : 'hidden'}
      />
      <rect
        x={'100%'}
        y={'50%'}
        width={resizeRectWidth}
        height={resizeRectWidth}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#ffffff'
        transform={boxTranslate}
        visibility={height * scale > 25 ? 'visible' : 'hidden'}
      />
      <rect
        x={0}
        y={'50%'}
        width={resizeRectWidth}
        height={resizeRectWidth}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#ffffff'
        transform={boxTranslate}
        visibility={height * scale > 25 ? 'visible' : 'hidden'}
      />
    </SelectSC>
  )
}

export default memo(Select)
