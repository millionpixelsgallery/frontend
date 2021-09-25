import { CSSProperties, memo } from 'react'
import {
  DetailsTooltipSC,
  DetailsTooltipSCProps,
} from 'components/Viewport/Tooltip/DetailsTooltip/styled'
import Link from 'components/ui/Link'
import { marginBottom } from 'utils/style/indents'
import { prepareLink } from 'utils/link'
import cn from 'classnames'
import { Pixels } from 'lib/web3connect'

export interface DetailsTooltipProps extends DetailsTooltipSCProps {
  className?: string
  style?: CSSProperties
  pixel?: Pixels
}

function DetailsTooltip({ className, style, pixel, ...rest }: DetailsTooltipProps) {
  return (
    <DetailsTooltipSC className={className} style={style} {...rest}>
      <div className='pixel-title text-nowrap' style={marginBottom(8)}>
        {pixel?.image?.title || 'No title'}
      </div>
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
