import { CSSProperties, memo, useState } from 'react'
import { HeaderSC, HeaderSCProps } from './styled'
import SiteLogo from 'components/ui/SiteLogo'
import Button from 'components/ui/Button'
import { Row } from 'components/ui/Grid'
import NavLink from 'components/ui/NavLink'
import Link from 'components/ui/Link'
import { marginBottom } from 'utils/style/indents'
import Modal from 'components/ui/Modal'
import ByPixels from 'components/ByPixels'

export interface HeaderProps extends HeaderSCProps {
  className?: string
  style?: CSSProperties
}

function Header({ style }: HeaderProps) {
  const [step, setStep] = useState(1)
  const onBack = () => {
    setStep((step) => step - 1)
  }
  const onCloseCb = () => {
    setStep(1)
  }
  return (
    <HeaderSC style={style} justify='between' align='center'>
      <Link to='/'>
        <SiteLogo />
      </Link>
      <Row align='center' gap={50}>
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
        <Modal
          trigger={
            <Button size='lg' width={150} style={marginBottom(12)}>
              BUY PIXELS
            </Button>
          }
          onBack={step ? onBack : undefined}
          component={ByPixels}
          closeCb={onCloseCb}
          componentProps={{
            step,
            onChangeStep: setStep,
            data: {
              width: 400,
              height: 400,
              position: {
                x: 10,
                y: 10,
              },
              price: 6,
            },
          }}
        />
      </Row>
    </HeaderSC>
  )
}

export default memo(Header)
