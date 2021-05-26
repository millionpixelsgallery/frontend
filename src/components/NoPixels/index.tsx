import { CSSProperties, memo } from 'react'
import { NoPixelsSC, NoPixelsSCProps } from './styled'
import { Col } from 'components/ui/Grid'
import Title from 'components/ui/Title'
import Text from 'components/ui/Text'
import Link from 'components/ui/Link'
import noPixelsPng from './assets/NoPixels.png'
import { marginTop } from 'utils/style/indents'

export interface NoPixelsProps extends NoPixelsSCProps {
  className?: string
  style?: CSSProperties
}

function NoPixels({ className, style, ...rest }: NoPixelsProps) {
  return (
    <NoPixelsSC className={className} style={style} {...rest}>
      <Col align={'center'} gap={50}>
        <Title>MY PIXELS</Title>
        <Text className={'text-center'}>
          You currently don’t own any pixels
          <br /> in this wallet.
          <br /> Now is a good time to <Link to={''}>buy</Link>
        </Text>
        <img src={noPixelsPng} alt={'no pixels'} />
        <Text type={'S'} style={marginTop(50)}>
          <Link to={''} type={'secondary'}>
            CONNECT OTHER WALLET
          </Link>
        </Text>
      </Col>
    </NoPixelsSC>
  )
}

export default memo(NoPixels)
