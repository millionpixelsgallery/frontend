import { CSSProperties, memo, useMemo } from 'react'
import { MyPixelsSC, MyPixelsSCProps } from './styled'
import Title from 'components/ui/Title'
import Text from 'components/ui/Text'
import Link from 'components/ui/Link'
import noPixelsPng from 'components/NoPixels/assets/NoPixels.png'
import { marginTop, paddingBottom } from 'utils/style/indents'
import { Col } from 'components/ui/Grid'
import { pixelsListMockedData } from 'components/PixelsList/mockedData'
import PixelsList from 'components/PixelsList'

export interface MyPixelsProps extends MyPixelsSCProps {
  className?: string
  style?: CSSProperties
}

function MyPixels({ className, style, ...rest }: MyPixelsProps) {
  const data = pixelsListMockedData
  const hasPixels = useMemo(() => Boolean(data.length), [data.length])

  return (
    <MyPixelsSC className={className} style={style} {...rest}>
      <Col align={'center'} gap={50}>
        <Title>MY PIXELS</Title>
        <Text className={'text-center'}>
          {hasPixels ? (
            'These are your pixels, use them wisely.'
          ) : (
            <>
              You currently don’t own any pixels
              <br /> in this wallet.
              <br /> Now is a good time to <Link to={''}>buy</Link>
            </>
          )}
        </Text>
        {hasPixels ? (
          <PixelsList data={data} style={paddingBottom(50)} />
        ) : (
          <>
            <img src={noPixelsPng} alt={'no pixels'} />
            <Text type={'S'} style={marginTop(50)}>
              <Link to={''} type={'secondary'}>
                CONNECT OTHER WALLET
              </Link>
            </Text>
          </>
        )}
      </Col>
    </MyPixelsSC>
  )
}

export default memo(MyPixels)
