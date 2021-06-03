import { CSSProperties, memo, ReactNode } from 'react'
import { EditPixelsConfirmEditSC, EditPixelsConfirmEditSCProps } from './styled'
import { Col, Row } from 'components/ui/Grid'
import Title from 'components/ui/Title'
import { marginBottom, padding } from 'utils/style/indents'
import Area from 'components/ui/Area'
import { ByPixelsValues, ProductData } from 'components/ByPixels'
import Text from 'components/ui/Text'
import { FormSubType } from 'hooks/useForm'
import { formatBytes } from 'utils/formatBytes'
import { EllipsisDivSC } from 'components/ByPixels/ByPixelsUploadPhoto/styled'
import { cratePlaceHolder } from 'utils/cratePlaceHolderFile'

export interface EditPixelsConfirmEditProps extends EditPixelsConfirmEditSCProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  formik: FormSubType<ByPixelsValues>
  data: ProductData
}

function EditPixelsConfirmEdit({
  className,
  style,
  children,
  formik,
  data,
  ...rest
}: EditPixelsConfirmEditProps) {
  return (
    <EditPixelsConfirmEditSC className={className} style={style} {...rest}>
      <Col justify={'between'} className={'full-height'}>
        <Col style={padding(0, 50)}>
          <Title className={'text-center'} style={marginBottom(58)}>
            CONFIRM YOUR EDIT
          </Title>
          <Row gap={30} justify={'start'} align={'center'}>
            <Area name={'YOUR PHOTO'} className={'photo-area'}>
              {
                <img
                  src={
                    !formik.values.image || formik.errors.image
                      ? cratePlaceHolder(data.width, data.height)
                      : URL.createObjectURL(formik.values.image)
                  }
                  alt={formik.values.image ? formik.values.image.name : 'dollar'}
                />
              }
            </Area>
            <Col gap={20} className={'overflow-anywhere'}>
              {formik.values.image && !formik.errors.image && (
                <>
                  <Text type={'MGray'}>
                    Image Type: <Text type={'M'}>{formik.values.image?.name.split('.').pop()}</Text>
                  </Text>
                  <Text type={'MGray'}>
                    File size: <Text type={'M'}>{formatBytes(formik.values.image.size)}</Text>
                  </Text>
                </>
              )}
              {formik.values.link && (
                <EllipsisDivSC maxWidth={355}>
                  <Text type={'MGray'}>
                    Your link: <Text type={'M'}>{formik.values.link} </Text>
                  </Text>
                </EllipsisDivSC>
              )}
              {formik.values.title && (
                <Text type={'MGray'}>
                  your TITLE: <Text type={'M'}>{formik.values.title}</Text>
                </Text>
              )}
            </Col>
          </Row>
        </Col>
        {children}
      </Col>
    </EditPixelsConfirmEditSC>
  )
}

export default memo(EditPixelsConfirmEdit)
