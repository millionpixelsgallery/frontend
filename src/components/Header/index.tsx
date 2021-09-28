import { CSSProperties, memo, useCallback, useState } from 'react'
import { HeaderSC, HeaderSCProps } from './styled'
import SiteLogo from 'components/ui/SiteLogo'
import Button from 'components/ui/Button'
import { Row } from 'components/ui/Grid'
import NavLink from 'components/ui/NavLink'
import Link from 'components/ui/Link'
import Modal from 'components/ui/Modal'
import ByPixelsSelectWallet from 'components/ByPixels/ByPixelsSelectWallet'

import { marginBottom, padding } from 'utils/style/indents'
import { usePixelsController } from 'hooks/usePixels'
import { useHistory } from 'react-router-dom'
import { useApiConnect, useApiConnection, useApiMethods } from 'hooks/useApi'

export interface HeaderProps extends HeaderSCProps {
  className?: string
  style?: CSSProperties
}

function Header({ style }: HeaderProps) {
  const [displayWalletModal, setDisplayWalletModal] = useState(false)
  const { setSelectionActive } = usePixelsController()
  const history = useHistory()
  const connectionDetails = useApiConnection()
  const connect = useApiConnect()
  const web3Methods = useApiMethods()

  const handleWalletAction = useCallback(() => {
    if (connectionDetails?.isConnected && connectionDetails.chainId !== '0x1') {
      return web3Methods?.switchMainnet()
    }
    if (!connectionDetails?.isConnected) {
      setDisplayWalletModal(true)
    }
  }, [connectionDetails, web3Methods])

  const handleSelectWallet = useCallback(
    async (wallet, onClose) => {
      await connect(wallet).finally(() => {
        onClose()
      })
    },
    [connect]
  )

  const handleSelectWalletClose = useCallback(() => {
    setDisplayWalletModal(false)
  }, [setDisplayWalletModal])

  return (
    <HeaderSC style={style} justify='between' align='center'>
      <Link to='/'>
        <SiteLogo />
      </Link>
      <Row align='center' gap={50} style={{ marginLeft: 50 }}>
        <Row gap={50}>
          <NavLink to='/gallery' className={'gallery'}>
            {' '}
            THE NFT GALLERY{' '}
          </NavLink>
          <NavLink to='/my-pixels' className={'pixels'}>
            {' '}
            MY Pixels{' '}
          </NavLink>
          <NavLink to='/marketplace' className={'marketplace'}>
            {' '}
            Marketplace{' '}
          </NavLink>
        </Row>
        <Button
          size='lg'
          width={150}
          style={marginBottom(12)}
          onClick={() => {
            history.push('/buy')
            setSelectionActive(true)
          }}
        >
          BUY PIXELS
        </Button>
        <Button
          type='outlined_orange'
          style={{
            width: '250px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            ...marginBottom(12),
          }}
          onClick={handleWalletAction}
        >
          {connectionDetails?.isConnected ? connectionDetails.address : 'Connect Wallet'}
          {!connectionDetails?.isConnected || connectionDetails.isCorrectNetwork
            ? null
            : '\nSwitch to mainnet'}
        </Button>
      </Row>
      <Modal
        component={ByPixelsSelectWallet}
        componentProps={{ onSelect: handleSelectWallet, style: padding(50, 111, 58) }}
        onClose={handleSelectWalletClose}
        closableByEsc
        visible={displayWalletModal}
      />
    </HeaderSC>
  )
}

export default memo(Header)
