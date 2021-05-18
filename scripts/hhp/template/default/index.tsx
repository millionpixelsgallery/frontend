import { CSSProperties, memo } from 'react'

export interface __NAME__Props {
  className?: string
  style?: CSSProperties
}

function __NAME__({ className, style }: __NAME__Props) {
  return <div className={className} style={style}></div>
}

export default memo(__NAME__)
