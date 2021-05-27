import { CSSProperties, memo } from 'react'
import { SocialIconSC, SocialIconSCProps } from './styled'

export interface SocialIconProps extends SocialIconSCProps {
  className?: string
  style?: CSSProperties
  src?: string
  alt?: string
}

function SocialIcon({ className, style, src, alt }: SocialIconProps) {
  return <SocialIconSC className={className} style={style} src={src} alt={alt} />
}

export default memo(SocialIcon)
