import { CSSProperties, memo } from 'react'
import { InfoBlockPxSC } from './styled'
import Text from 'components/ui/Text'
import { Row } from 'components/ui/Grid'
import Burger from 'components/ui/Burger'

export interface InfoBlockPxProps extends Omit<JSX.IntrinsicElements['div'], 'ref'> {
  className?: string
  style?: CSSProperties
  title?: string
}

function InfoBlockPx({ className, style, title, children }: InfoBlockPxProps) {
  return (
    <InfoBlockPxSC className={className} style={style} align='center'>
      <Text className={'title'} uppercase={false}>
        {title}
      </Text>
      <Row>
        <Text className={'child'}>{children}</Text>
        <Burger />
      </Row>
    </InfoBlockPxSC>
  )
}

export default memo(InfoBlockPx)
