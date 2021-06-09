import { CSSProperties, memo, useMemo } from 'react'
import {
  DetailsTooltipSC,
  DetailsTooltipSCProps,
} from 'components/Viewport/Tooltip/DetailsTooltip/styled'
import { usePixelsController } from 'hooks/usePixels'
import Link from 'components/ui/Link'
import { marginBottom } from 'utils/style/indents'
import { prepareLink } from 'utils/link'
import cn from 'classnames'

export interface DetailsTooltipProps extends DetailsTooltipSCProps {
  className?: string
  style?: CSSProperties
  x: number
  y: number
}

function DetailsTooltip({ className, style, x, y, ...rest }: DetailsTooltipProps) {
  const { pixels } = usePixelsController()
  const pixel = useMemo(
    () => pixels?.find((pixel) => pixel.area[0] === x && pixel.area[1] === y),
    [pixels]
  )
  return (
    <DetailsTooltipSC className={className} style={style} {...rest}>
      <div style={marginBottom(8)}>{pixel?.image?.title || 'No title'}</div>
      <Link
        className={cn({ disabled: !pixel?.image?.link })}
        href={pixel?.image?.link ? prepareLink(pixel?.image?.link) : '#'}
        native
        target={pixel?.image?.link ? '_blank' : undefined}
      >
        {pixel?.image?.link || 'No link'}
      </Link>
    </DetailsTooltipSC>
  )
}

export default memo(DetailsTooltip)
