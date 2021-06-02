import { CSSProperties, memo, useCallback } from 'react'
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
import { Web3Providers } from 'lib/web3connect'

export interface ByPixelsSelectWalletProps extends ByPixelsSelectWalletSCProps {
  className?: string
  style?: CSSProperties
  onSelect: (wallet: Web3Providers) => void
}

export enum WalletEnum {
  Metamask = 'metamask',
  Fortmatic = 'fortmatic',
  Portis = 'portis',
  Torus = 'torus',
}

function ByPixelsSelectWallet({ className, onSelect, style, ...rest }: ByPixelsSelectWalletProps) {
  const handleSelect = useCallback(
    (e) => {
      const wallet: Web3Providers = e.currentTarget.dataset.wallet
      onSelect(wallet)
    },
    [onSelect]
  )

  return (
    <ByPixelsSelectWalletSC className={className} style={style} {...rest}>
      <Col align={'center'}>
        <Title style={marginBottom(50)}>Select a Wallet</Title>
        <Text style={marginBottom(100)} className={'text-center'}>
          Please select a wallet to connect to Million pixels gallery.
          <br />
          <Text type={'LGray'}>
            First, to Lock the wanted space, <br />
            Then, to create your nft and complete your purchase.
          </Text>
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
              data-wallet={WalletEnum.Portis}
              onClick={handleSelect}
            >
              <Row align={'center'} justify={'start'} style={marginLeft(23)}>
                <img src={portis} alt={WalletEnum.Portis} style={marginRight(36)} />
                <span>Portis</span>
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
                <span>TOrus</span>
              </Row>
            </Button>
          </Row>
        </Col>
        <Text type={'S'} lineHeight={28}>
          * We do not own your private keys and cannot access your funds without your confirmation.
        </Text>
      </Col>
    </ByPixelsSelectWalletSC>
  )
}

export default memo(ByPixelsSelectWallet)
