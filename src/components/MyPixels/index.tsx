import { CSSProperties, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { MyPixelsSC, MyPixelsSCProps } from './styled'
import Title from 'components/ui/Title'
import Text from 'components/ui/Text'
import Link from 'components/ui/Link'
import noPixelsPng from 'components/MyPixels/assets/NoPixels.png'
import { marginTop, padding, paddingBottom } from 'utils/style/indents'
import { Col } from 'components/ui/Grid'
import PixelsList from 'components/PixelsList'
import { useApi } from 'hooks/useApi'
import { Pixels } from 'lib/web3connect'
import ByPixelsSelectWallet from 'components/ByPixels/ByPixelsSelectWallet'
import Modal from 'components/ui/Modal'
import { useHistory } from 'react-router-dom'
import Button from 'components/ui/Button'
import ByPixels from 'components/ByPixels'

export interface MyPixelsProps extends MyPixelsSCProps {
  className?: string
  style?: CSSProperties
}

function MyPixels({ className, style, ...rest }: MyPixelsProps) {
  const { methods, connect, loading: apiLoading } = useApi()
  const history = useHistory()

  const [data, setData] = useState<Pixels[] | null>(null)

  const dataLength = data && data.length
  const hasPixels = useMemo(() => Boolean(dataLength), [dataLength])
  const [loading, setLoading] = useState(true)

  const handleSelectWallet = useCallback(
    async (wallet) => {
      await connect(wallet).finally(() => setLoading(false))
    },
    [connect]
  )

  const handleSelectWalletClose = useCallback(() => {
    if (!methods) history.replace('/gallery')
  }, [methods, history])

  const handleGetData = useCallback(() => {
    methods?.getAllMyPixels().then((myPixels) =>
      setData((prevState) => {
        setLoading(false)
        return myPixels ?? prevState
      })
    )
  }, [methods])

  useEffect(handleGetData, [handleGetData])

  return (
    <MyPixelsSC className={className} style={style} {...rest}>
      {methods || apiLoading ? (
        <Col align={'center'} gap={50}>
          <Title>MY PIXELS</Title>
          <Text className={'text-center'}>
            {loading && !apiLoading && 'Loading...'}
            {apiLoading && !data && 'Connecting to a wallet...'}
            {!loading && hasPixels && 'These are your pixels, use them wisely.'}
            {!loading && !hasPixels && (
              <>
                You currently don’t own any pixels
                <br /> in this wallet.
                <br /> Now is a good time to{' '}
                <Modal component={ByPixels} trigger={<Link to={'/gallery'}>buy</Link>} />
              </>
            )}
          </Text>
          {!loading &&
            (hasPixels ? (
              <PixelsList data={data!} style={paddingBottom(50)} />
            ) : (
              <>
                <img src={noPixelsPng} alt={'no pixels'} />
                <Text type={'S'} style={marginTop(50)}>
                  <Modal
                    component={ByPixelsSelectWallet}
                    componentProps={{ onSelect: handleSelectWallet, style: padding(50, 111, 58) }}
                    onClose={handleSelectWalletClose}
                    closableByEsc
                    trigger={
                      <Button type={'wrapper'}>
                        <Link native href={'#'} type={'secondary'}>
                          CONNECT OTHER WALLET
                        </Link>
                      </Button>
                    }
                  />
                </Text>
              </>
            ))}
        </Col>
      ) : (
        <Modal
          visible={!methods && !apiLoading}
          component={ByPixelsSelectWallet}
          componentProps={{ onSelect: handleSelectWallet, style: padding(50, 111, 58) }}
          onClose={handleSelectWalletClose}
          closableByEsc
        />
      )}
    </MyPixelsSC>
  )
}

export default memo(MyPixels)
