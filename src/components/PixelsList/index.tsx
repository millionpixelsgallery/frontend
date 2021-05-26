import { CSSProperties, memo } from 'react'
import { PixelsListSC, PixelsListSCProps } from './styled'

export interface Coords {
  x: number
  y: number
}

export interface PixelsData {
  image: any
  width: number
  height: number
  position: Coords
  link?: string
  title?: string
  saleTimer?: string
}

export interface PixelsListProps extends PixelsListSCProps {
  data: PixelsData[]
  className?: string
  style?: CSSProperties
}

function PixelsList({ className, style, ...rest }: PixelsListProps) {
  return <PixelsListSC className={className} style={style} {...rest} />
}

export default memo(PixelsList)
