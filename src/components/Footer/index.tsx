import { CSSProperties, memo } from 'react'
import { FooterSC, FooterSCProps } from './styled'
import { Row } from 'components/ui/Grid'
import SocialIcon from 'components/ui/SocialIcon'
import Text from 'components/ui/Text'
import { marginTop } from 'utils/style/indents'
import { version } from '../../../package.json'
export interface FooterProps extends FooterSCProps {
  className?: string
  style?: CSSProperties
}

function Footer({ className, style, ...rest }: FooterProps) {
  const mailto = (e: any) => {
    const w = 800
    const h = 800
    const y = window.top.outerHeight / 2 + window.top.screenY - h / 2
    const x = window.top.outerWidth / 2 + window.top.screenX - w / 2
    window.open(
      'mailto:millionpixelsgallery@gmail.com',
      'mail',
      `width=${w}, height=${h},top=${y},left=${x}`
    )
    e.preventDefault()
  }
  return (
    <FooterSC className={className} style={style} {...rest}>
      <Row justify='between'>
        <Row gap={10}>
          <a href={'https://twitter.com/MPG_NFT'}>
            <SocialIcon src='/assets/twitter.svg' />
          </a>
          {/* <Link to='/'>
            <SocialIcon src='/assets/facebook.svg' />
          </Link>
          <Link to='/'>
            <SocialIcon src='/assets/instagram.svg' />
          </Link>
          <Link to='/'>
            <SocialIcon src='/assets/reddit.svg' />
          </Link> */}
        </Row>
        <Text color='#FFFFFF'>
          <a
            onClick={mailto}
            style={{ color: '#FFFFFF', textDecoration: 'none' }}
            href='mailto:millionpixelsgallery@gmail.com'
          >
            Contact Us
          </a>
        </Text>
      </Row>
      <Row style={marginTop(74)} align='center' justify='center'>
        <Text
          color='#FFFFFF'
          size='12px'
          letterSpacing='0.42px'
          lineHeight='17px'
          className={'copyright'}
        >
          <div>© Copyright 2021 millionpixelsgallery.com. All rights reserved. v{version} </div>
          <div>
            millionpixelsgallery.com cannot be held responsible for content on linked sites. Images
            shown on millionpixelsgallery.com are copyrighted by their owners.
          </div>
        </Text>
      </Row>
    </FooterSC>
  )
}

export default memo(Footer)
