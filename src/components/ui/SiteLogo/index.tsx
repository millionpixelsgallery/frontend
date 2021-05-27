import { CSSProperties, memo } from 'react'
import { SiteLogoSC, SiteLogoSCProps } from './styled'

export interface SiteLogoProps extends SiteLogoSCProps {
  className?: string
  style?: CSSProperties
}

function SiteLogo({ className, style }: SiteLogoProps) {
  return (
    <SiteLogoSC className={className} style={style} src='/assets/logo.svg' alt='site logo' />
  )
}

export default memo(SiteLogo)
