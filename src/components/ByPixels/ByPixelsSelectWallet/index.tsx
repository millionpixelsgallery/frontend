import { CSSProperties, memo, useCallback, useState } from 'react'
import LoadingOverlay from 'react-loading-overlay'
import { ByPixelsSelectWalletSC, ByPixelsSelectWalletSCProps } from './styled'
import Title from 'components/ui/Title'
import { marginBottom, marginLeft, marginRight } from 'utils/style/indents'
import Text from 'components/ui/Text'
import { Col, Row } from 'components/ui/Grid'
import Button from 'components/ui/Button'
import metamask from './assets/metamask.png'
import fortmatic from './assets/fortmatic.png'
import portis from './assets/portis.png'
import torus from './assets/torus.png'
import walletconnect from './assets/walletconnect.png'

export interface ByPixelsSelectWalletProps extends ByPixelsSelectWalletSCProps {
  className?: string
  style?: CSSProperties
  onSelect: (wallet: WalletEnum, onClose?: () => void) => void
  onClose?: () => void
  fullTitle?: boolean
}

export enum WalletEnum {
  Metamask = 'metamask',
  Fortmatic = 'fortmatic',
  Portis = 'portis',
  Torus = 'torus',
  WalletConnect = 'walletconnect',
}

function ByPixelsSelectWallet({
  className,
  onSelect,
  style,
  onClose,
  fullTitle = false,
}: ByPixelsSelectWalletProps) {
  const handleSelect = useCallback(
    (e) => {
      const wallet: WalletEnum = e.currentTarget.dataset.wallet
      setLoading(true)
      onSelect(wallet, onClose)
    },
    [onSelect, onClose]
  )

  const [isLoading, setLoading] = useState(false)

  return (
    <LoadingOverlay
      active={isLoading}
      spinner
      text='Loading...'
      styles={{ overlay: (base) => ({ ...base, borderRadius: '23px', opacity: 0.7 }) }}
    >
      <ByPixelsSelectWalletSC className={className} style={style}>
        <Col align={'center'}>
          <Title style={{ ...marginBottom(50) }}>Select a Wallet</Title>
          <Text style={marginBottom(100)} className={'text-center'}>
            <span style={{ fontWeight: fullTitle ? 600 : undefined }}>
              Please select a wallet to connect to Million pixels gallery.
            </span>
            {fullTitle && (
              <>
                <br />
                <Text type={'L'}>
                  First, to Lock the wanted space, <br />
                  Then, to create your nft and complete your purchase.
                </Text>
              </>
            )}
          </Text>
          <Col gap={30} style={marginBottom(162)}>
            <Row gap={30}>
              <Button
                type={'outlined'}
                width={200}
                data-wallet={WalletEnum.Metamask}
                onClick={handleSelect}
              >
                <Row align={'center'} justify={'start'} style={marginLeft(18)}>
                  <img src={metamask} alt={WalletEnum.Metamask} style={marginRight(25)} />
                  <span>METAMASK</span>
                </Row>
              </Button>
              <Button
                type={'outlined'}
                width={200}
                data-wallet={WalletEnum.Fortmatic}
                onClick={handleSelect}
              >
                <Row align={'center'} justify={'start'} style={marginLeft(18)}>
                  <img src={fortmatic} alt={WalletEnum.Fortmatic} style={marginRight(25)} />
                  <span>Fortmatic</span>
                </Row>
              </Button>
            </Row>
            <Row gap={30}>
              <Button
                type={'outlined'}
                width={200}
                data-wallet={WalletEnum.WalletConnect}
                onClick={handleSelect}
              >
                <Row align={'center'} justify={'start'} style={marginLeft(23)}>
                  <img src={walletconnect} alt={WalletEnum.WalletConnect} style={marginRight(36)} />
                  <span>Wallet Connect</span>
                </Row>
              </Button>
              <Button
                type={'outlined'}
                width={200}
                data-wallet={WalletEnum.Torus}
                onClick={handleSelect}
              >
                <Row align={'center'} justify={'start'} style={marginLeft(18)}>
                  <img src={torus} alt={WalletEnum.Torus} style={marginRight(29)} />
                  <span>Torus</span>
                </Row>
              </Button>
            </Row>
          </Col>
          <Text type={'S'} lineHeight={28}>
            * We do not own your private keys and cannot access your funds without your confirmation.
          </Text>
        </Col>
      </ByPixelsSelectWalletSC>
    </LoadingOverlay >
  )
}

export default memo(ByPixelsSelectWallet)
