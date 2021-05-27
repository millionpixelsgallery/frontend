import { CSSProperties, memo } from 'react'
import { HeaderSC, HeaderSCProps } from './styled'
import SiteLogo from 'components/ui/SiteLogo'
import Button from 'components/ui/Button'
import { Row } from 'components/ui/Grid'
import NavLink from 'components/ui/NavLink'
import Link from 'components/ui/Link'
import { marginBottom } from 'utils/style/indents'

export interface HeaderProps extends HeaderSCProps {
  className?: string
  style?: CSSProperties
}

function Header({ style }: HeaderProps) {
  return (
    <HeaderSC style={style} justify='between' align='center'>
      <Link to="/"><SiteLogo/></Link>
      <Row align='center' gap={50}>
        <Row gap={50}>
          <NavLink to="/gallery"> THE NFT GALLERY </NavLink>
          <NavLink to="/my-pixels"> MY Pixels </NavLink>
          <NavLink to="/marketplace"> Marketplace </NavLink>
        </Row>
        <Button size="lg" width={150} style={marginBottom(12)}>BUY PIXELS</Button>
      </Row>
    </HeaderSC>)
}

export default memo(Header)
