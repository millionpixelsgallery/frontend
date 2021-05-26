import { CSSProperties, memo, ReactNode } from 'react'
import { ByPixelsUploadPhotoSC, ByPixelsUploadPhotoSCProps } from './styled'
import { Col } from 'components/ui/Grid'
import Title from 'components/ui/Title'

export interface ByPixelsUploadPhotoProps extends ByPixelsUploadPhotoSCProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

function ByPixelsUploadPhoto({ className, style, children, ...rest }: ByPixelsUploadPhotoProps) {
  return (
    <ByPixelsUploadPhotoSC className={className} style={style} {...rest}>
      <Col justify={'between'}>
        <Col>
          <Title>UPLOAD YOUR PHOTO (*OPTIONAL)</Title>
        </Col>
        {children}
      </Col>
    </ByPixelsUploadPhotoSC>
  )
}

export default memo(ByPixelsUploadPhoto)
