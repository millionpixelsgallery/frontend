import { CSSProperties, memo } from 'react'
import { TypographySC } from './styled'

export interface TypographyProps extends Omit<JSX.IntrinsicElements['span'], 'ref'> {
  className?: string
  style?: CSSProperties
  type?: 'title' | 'text'
  as?: keyof JSX.IntrinsicElements
}

function Typography({ className, style, children, type = 'title', ...rest }: TypographyProps) {
  return (
    <TypographySC className={className} style={style} $type={type} {...rest}>
      {children}
    </TypographySC>
  )
}

export default memo(Typography)
