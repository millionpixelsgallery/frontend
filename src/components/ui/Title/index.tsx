import { CSSProperties, memo } from 'react'
import { TitleSC } from './styled'

export interface TitleProps extends Omit<JSX.IntrinsicElements['span'], 'ref'> {
  className?: string
  style?: CSSProperties
  as?: keyof JSX.IntrinsicElements
}

function Title({ className, style, children, ...rest }: TitleProps) {
  return (
    <TitleSC className={className} style={style} {...rest}>
      {children}
    </TitleSC>
  )
}

export default memo(Title)
