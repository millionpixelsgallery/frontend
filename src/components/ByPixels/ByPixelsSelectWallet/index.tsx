import { CSSProperties, memo } from 'react'
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

export interface ByPixelsSelectWalletProps extends ByPixelsSelectWalletSCProps {
  className?: string
  style?: CSSProperties
}

function ByPixelsSelectWallet({ className, style, ...rest }: ByPixelsSelectWalletProps) {
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
            <Button type={'outlined'} width={200}>
              <Row align={'center'} justify={'start'} style={marginLeft(18)}>
                <img src={metamask} alt={'metamask'} style={marginRight(25)} />
                <span>METAMASK</span>
              </Row>
            </Button>
            <Button type={'outlined'} width={200}>
              <Row align={'center'} justify={'start'} style={marginLeft(18)}>
                <img src={fortmatic} alt={'fortmatic'} style={marginRight(25)} />
                <span>Fortmatic</span>
              </Row>
            </Button>
          </Row>
          <Row gap={30}>
            <Button type={'outlined'} width={200}>
              <Row align={'center'} justify={'start'} style={marginLeft(23)}>
                <img src={portis} alt={'portis'} style={marginRight(36)} />
                <span>Portis</span>
              </Row>
            </Button>
            <Button type={'outlined'} width={200}>
              <Row align={'center'} justify={'start'} style={marginLeft(18)}>
                <img src={torus} alt={'torus'} style={marginRight(29)} />
                <span>TOrus</span>
              </Row>
            </Button>
          </Row>
        </Col>
        <Text type={'S'} lineHeight={28} style={marginBottom(58)}>
          * We do not own your private keys and cannot access your funds without your confirmation.
        </Text>
      </Col>
    </ByPixelsSelectWalletSC>
  )
}

export default memo(ByPixelsSelectWallet)
