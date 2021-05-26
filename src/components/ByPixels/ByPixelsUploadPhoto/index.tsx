import { CSSProperties, memo } from 'react'
import { ByPixelsUploadPhotoSC, ByPixelsUploadPhotoSCProps } from './styled'

export interface ByPixelsUploadPhotoProps extends ByPixelsUploadPhotoSCProps {
  className?: string
  style?: CSSProperties
}

function ByPixelsUploadPhoto({ className, style, ...rest }: ByPixelsUploadPhotoProps) {
  return (
    <ByPixelsUploadPhotoSC className={className} style={style} {...rest}></ByPixelsUploadPhotoSC>
  )
}

export default memo(ByPixelsUploadPhoto)
