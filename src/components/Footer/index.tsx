import { CSSProperties, memo } from 'react'
import { FooterSC, FooterSCProps } from './styled'
import { Row } from 'components/ui/Grid'
import SocialIcon from 'components/ui/SocialIcon'
import Text from 'components/ui/Text'
import { marginRight, marginTop } from 'utils/style/indents'
import Link from 'components/ui/Link'

export interface FooterProps extends FooterSCProps {
  className?: string
  style?: CSSProperties
}

function Footer({ className, style, ...rest }: FooterProps) {
  return (
    <FooterSC className={className} style={style} {...rest}>
      <Row style={marginTop(24)} justify='between'>
      <div>
        <Link to="/"><SocialIcon src='/assets/facebook.svg' style={marginRight(10)} /></Link>
        <Link to="/"><SocialIcon src='/assets/instagram.svg' style={marginRight(10)} /></Link>
        <Link to="/"><SocialIcon src='/assets/reddit.svg' style={marginRight(10)} /></Link>
        <Link to="/"><SocialIcon src='/assets/twitter.svg' style={marginRight(10)} /></Link>
      </div>
      <Text color='#FFFFFF'>Contact us</Text>
      </Row>
      <Row style={marginTop(74)} align='center' justify='center'>
        <Text color='#FFFFFF' size='12px' letterSpacing='0.42px' lineHeight='17px' className={'copyright'}>
          <div>© Copyright 2021 millionpixelsnfthomepage.com. All rights reserved. </div>
          <div>millionpixelsnfthomepage.com cannot be held responsible for content on linked sites. Images shown on millionpixelsnfthomepage.com are copyrighted by their owners.</div>
        </Text>
      </Row>
    </FooterSC>
  )
}

export default memo(Footer)
