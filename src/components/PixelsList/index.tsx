import { CSSProperties, memo } from 'react'
import { PixelsListSC, PixelsListSCProps } from './styled'
import PixelsDetailsRow from 'components/PixelsList/PixelsDetailsRow'
import { padding } from 'utils/style/indents'
import { Pixels } from 'lib/web3connect'

export interface Coords {
  x: number
  y: number
}

export interface PixelsListProps extends PixelsListSCProps {
  data: Pixels[]
  className?: string
  style?: CSSProperties
  getData?: () => void
}

function PixelsList({ data, className, style, getData, ...rest }: PixelsListProps) {
  return (
    <PixelsListSC
      className={className}
      style={style}
      $showFirstTopBorder={data.length === 1}
      {...rest}
    >
      {data &&
        Boolean(data.length) &&
        data.map((pixels, i) => (
          <PixelsDetailsRow key={i} getData={getData} data={pixels} style={padding(50, 0, 20)} />
        ))}
    </PixelsListSC>
  )
}

export default memo(PixelsList)
