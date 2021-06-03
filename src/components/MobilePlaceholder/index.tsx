import { CSSProperties, memo } from 'react'
import { MobilePlaceholderSC, MobilePlaceholderSCProps } from './styled'
import Button from 'components/ui/Button'
import Title from 'components/ui/Title'
import Text from 'components/ui/Text'
import { marginTop, margin, marginBottom } from 'utils/style/indents'

export interface MobilePlaceholderProps extends MobilePlaceholderSCProps {
  className?: string
  style?: CSSProperties
  onClose?: () => void
}

function MobilePlaceholder({ className, style, onClose }: MobilePlaceholderProps) {
  return (
    <MobilePlaceholderSC className={className} style={style} align={'center'}>
      <Title className={'cardTitle'} style={marginTop(50)}>
        switch to desktop
      </Title>
      <Text style={marginTop(10)}>for best user experience </Text>
      <Text>Please switch to desktop</Text>
      <img src='/assets/cat.svg' alt={'cat'} style={margin(35, 0, 35, 0)} />
      <Button width={200} style={marginBottom(25)} onClick={onClose}>
        OK. got it.
      </Button>
    </MobilePlaceholderSC>
  )
}

export default memo(MobilePlaceholder)
