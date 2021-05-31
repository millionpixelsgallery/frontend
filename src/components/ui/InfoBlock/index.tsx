import { CSSProperties, memo } from 'react'
import { InfoBlockSC } from './styled'
import Text from 'components/ui/Text'

export interface InfoBlockProps extends Omit<JSX.IntrinsicElements['div'], 'ref'> {
  className?: string
  style?: CSSProperties
  title?: string
}

function InfoBlock({ className, style, title, children }: InfoBlockProps) {
  return (
    <InfoBlockSC className={className} style={style} title={title}>
      <Text className={'title'}>{title}</Text>
      <Text className={'child'}>{children}</Text>
    </InfoBlockSC>
  )
}

export default memo(InfoBlock)
