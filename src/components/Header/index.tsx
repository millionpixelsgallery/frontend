import { CSSProperties, memo } from 'react'
import { HeaderSC, HeaderSCProps } from './styled'
import SiteLogo from 'components/ui/SiteLogo'
import Button from 'components/ui/Button'
import { Row } from 'components/ui/Grid'
import NavLink from 'components/ui/NavLink'
import Link from 'components/ui/Link'
import { marginBottom, marginRight } from 'utils/style/indents'

export interface HeaderProps extends HeaderSCProps {
  className?: string
  style?: CSSProperties
}

function Header({ className, style, ...rest }: HeaderProps) {
  return (
    <HeaderSC className={className} style={style} {...rest}>
        <Row className={'content'} justify='between' align='center'>
          <Link to="/"><SiteLogo/></Link>
          <Row align='center'>
            <Row>
              <NavLink to="/gallery" style={marginRight(50)}> THE NFT GALLERY </NavLink>
              <NavLink to="/my-pixels" style={marginRight(50)}> MY Pixels </NavLink>
              <NavLink to="/marketplace" style={marginRight(50)}> Marketplace </NavLink>
            </Row>
            <Button size="lg" width={150} style={marginBottom(12)}>BUY PIXELS</Button>
          </Row>
        </Row>
    </HeaderSC>)
}

export default memo(Header)
