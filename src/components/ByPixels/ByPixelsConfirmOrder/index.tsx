import { CSSProperties, memo } from 'react'
import { ByPixelsConfirmOrderSC, ByPixelsConfirmOrderSCProps } from './styled'

export interface ByPixelsConfirmOrderProps extends ByPixelsConfirmOrderSCProps {
  className?: string
  style?: CSSProperties
}

function ByPixelsConfirmOrder({ className, style, ...rest }: ByPixelsConfirmOrderProps) {
  return (
    <ByPixelsConfirmOrderSC className={className} style={style} {...rest}></ByPixelsConfirmOrderSC>
  )
}

export default memo(ByPixelsConfirmOrder)
