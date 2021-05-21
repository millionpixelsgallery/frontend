import { CSSProperties, memo } from 'react'
import { CardSC } from './styled'

export type CardTypes = 'default' | 'success' | 'error'

export interface CardProps extends Omit<JSX.IntrinsicElements['div'], 'ref'> {
  type?: CardTypes
  title?: string
  className?: string
  style?: CSSProperties
}

function Card({ type = 'default', title, children, ...rest }: CardProps) {
  return (
    <CardSC type={type} {...rest}>
      {(title && title?.length > 0) && (<div className={'title'}>{title}</div>)}
      <div className={'content'}>{children}</div>
    </CardSC>
  )
}

export default memo(Card)




