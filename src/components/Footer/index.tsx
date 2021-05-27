import { CSSProperties, memo } from 'react'
import { FooterSC, FooterSCProps } from './styled'
import { Row } from 'components/ui/Grid'
import SocialIcon from 'components/ui/SocialIcon'
import Text from 'components/ui/Text'
import { marginRight, marginTop } from 'utils/style/indents'

export interface FooterProps extends FooterSCProps {
  className?: string
  style?: CSSProperties
}

function Footer({ className, style, ...rest }: FooterProps) {
  return (
    <FooterSC className={className} style={style} {...rest}>
      <div>
        <Row style={marginTop(24)} justify='between'>
        <div>
          <SocialIcon src='/assets/facebook.svg' style={marginRight(10)} />
          <SocialIcon src='/assets/instagram.svg' style={marginRight(10)} />
          <SocialIcon src='/assets/reddit.svg' style={marginRight(10)} />
          <SocialIcon src='/assets/twitter.svg' style={marginRight(10)} />
        </div>
        <Text color='#FFFFFF'>Contact us</Text>
        </Row>
        <Row style={marginTop(74)} align='center' justify='center'>
          <Text color='#FFFFFF' size='12px' letterSpacing='0.42px' lineHeight='17px' className={'copyright'}>
            <div>© Copyright 2021 millionpixelsnfthomepage.com. All rights reserved. </div>
            <div>millionpixelsnfthomepage.com cannot be held responsible for content on linked sites. Images shown on millionpixelsnfthomepage.com are copyrighted by their owners.</div>
          </Text>
        </Row>
      </div>
    </FooterSC>
  )
}

export default memo(Footer)
