import { CSSProperties, memo, useCallback, useEffect, useMemo } from 'react'
import { MyPixelsSC, MyPixelsSCProps } from './styled'
import Title from 'components/ui/Title'
import Text from 'components/ui/Text'
import Link from 'components/ui/Link'
import noPixelsPng from 'components/MyPixels/assets/NoPixels.png'
import { marginTop, padding, paddingBottom } from 'utils/style/indents'
import { Col } from 'components/ui/Grid'
import PixelsList from 'components/PixelsList'
import { useApi } from 'hooks/useApi'
import ByPixelsSelectWallet from 'components/ByPixels/ByPixelsSelectWallet'
import Modal from 'components/ui/Modal'
import { useHistory } from 'react-router-dom'
import Button from 'components/ui/Button'
import { usePixelsController } from 'hooks/usePixels'
import useLink from 'hooks/useLink'

export interface MyPixelsProps extends MyPixelsSCProps {
  className?: string
  style?: CSSProperties
}

function MyPixels({ className, style, ...rest }: MyPixelsProps) {
  const { methods, connect, loading: apiLoading } = useApi()
  const history = useHistory()
  const { setSelectionActive, fetchMyPixels, myPixels, myPixelsLoading } = usePixelsController()

  const hasPixels = useMemo(() => Boolean(myPixels?.length), [myPixels])

  const handleSelectWallet = useCallback(
    async (wallet, onClose) => {
      await connect(wallet).finally(() => {
        onClose()
      })
    },
    [connect]
  )

  const methodsRef = useLink(methods)
  const handleSelectWalletClose = useCallback(() => {
    if (!methodsRef.current) history.replace('/gallery')
  }, [history])

  useEffect(() => {
    if (methods && !myPixelsLoading && !myPixels) fetchMyPixels()
  }, [methods])

  return (
    <MyPixelsSC className={className} style={style} {...rest}>
      {methods || apiLoading ? (
        <Col align={'center'} gap={50}>
          <Title>MY PIXELS</Title>
          <Text className={'text-center'}>
            {apiLoading ? (
              'Connecting to a wallet...'
            ) : myPixelsLoading ? (
              'Loading...'
            ) : hasPixels ? (
              'These are your pixels, use them wisely.'
            ) : (
              <>
                You currently don’t own any pixels
                <br /> in this wallet.
                <br /> Now is a good time to{' '}
                <Link
                  to={'/gallery'}
                  onMouseDown={() => {
                    setSelectionActive(true)
                  }}
                >
                  buy
                </Link>
              </>
            )}
          </Text>
          {hasPixels && <PixelsList data={myPixels ?? []} style={paddingBottom(50)} />}
          {!hasPixels && !myPixelsLoading && !apiLoading && (
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
          )}
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
