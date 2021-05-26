import { CSSProperties, memo } from 'react'
import { PixelsListSC, PixelsListSCProps } from './styled'
import PixelsDetailsRow from 'components/PixelsList/PixelsDetailsRow'
import { padding } from 'utils/style/indents'

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
  saleUntil?: string
}

export interface PixelsListProps extends PixelsListSCProps {
  data: PixelsData[]
  className?: string
  style?: CSSProperties
}

function PixelsList({ data, className, style, ...rest }: PixelsListProps) {
  return (
    <PixelsListSC
      className={className}
      style={style}
      $showFirstTopBorder={data && data.length === 1}
      {...rest}
    >
      {data &&
        Boolean(data.length) &&
        data.map((pixels, i) => (
          <PixelsDetailsRow key={i} data={pixels} style={padding(50, 0, 20)} />
        ))}
    </PixelsListSC>
  )
}

export default memo(PixelsList)
