import { CSSProperties, memo } from 'react'
import { __NAME__SC, __NAME__SCProps } from './styled'

export interface __NAME__Props extends __NAME__SCProps {
  className?: string
  style?: CSSProperties
}

function __NAME__({ className, style, ...rest }: __NAME__Props) {
  return <__NAME__SC className={className} style={style} {...rest}></__NAME__SC>
}

export default memo(__NAME__)
