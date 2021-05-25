import { CSSProperties, memo } from 'react'
import { HeaderSC, HeaderSCProps } from './styled'
import SiteLogo from 'components/ui/SiteLogo'
import Button from 'components/ui/Button'
import { Row } from 'components/ui/Grid'
import NavLink from 'components/ui/NavLink'
import { marginRight } from 'utils/style/indents'

export interface HeaderProps extends HeaderSCProps {
  className?: string
  style?: CSSProperties
}

function Header({ className, style, ...rest }: HeaderProps) {
  return (
    <HeaderSC className={className} style={style} {...rest}>
        <Row className={'content'} justify='between' align='center'>
          <SiteLogo/>
          <Row>
            <Row>
              <NavLink to="/" style={marginRight(50)}> THE NFT GALLERY </NavLink>
              <NavLink to="/" style={marginRight(50)}> MY Pixels </NavLink>
              <NavLink to="/" style={marginRight(50)}> Marketplace </NavLink>
            </Row>
            <Button size="lg">BUY PIXELS</Button>
          </Row>
        </Row>
    </HeaderSC>)
}

export default memo(Header)
