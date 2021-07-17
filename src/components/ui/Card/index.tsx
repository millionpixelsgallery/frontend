import { CSSProperties, forwardRef, memo } from 'react'
import { CardSC } from './styled'

export type CardTypes = 'default' | 'success' | 'error'

type DivProps = JSX.IntrinsicElements['div']

export interface CardProps extends DivProps {
  type?: CardTypes
  title?: string
  className?: string
  style?: CSSProperties
}

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { type = 'default', title, children, ...rest },
  ref
) {
  return (
    <CardSC type={type} {...rest} ref={ref}>
      {title && title?.length > 0 && <div className={'title'}>{title}</div>}
      <div className={'content'}>{children}</div>
    </CardSC>
  )
})

export default memo(Card)
