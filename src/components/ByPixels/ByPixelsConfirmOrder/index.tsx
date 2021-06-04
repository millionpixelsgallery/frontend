import { CSSProperties, memo, ReactNode } from 'react'
import { ByPixelsConfirmOrderSC, ByPixelsConfirmOrderSCProps } from './styled'
import { Col, Row } from 'components/ui/Grid'
import Title from 'components/ui/Title'
import { margin, marginBottom, padding } from 'utils/style/indents'
import Area from 'components/ui/Area'
import { Calculate } from 'components/ByPixels/ByPixelsReviewPixels'
import { ByPixelsValues, ProductData } from 'components/ByPixels/index'
import Text from 'components/ui/Text'
import { FormSubType } from 'hooks/useForm'
import { formatBytes } from 'utils/formatBytes'
import { EllipsisDivSC } from 'components/ByPixels/ByPixelsUploadPhoto/styled'
import { cratePlaceHolder } from 'utils/cratePlaceHolderFile'

export interface ByPixelsConfirmOrderProps extends ByPixelsConfirmOrderSCProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  formik: FormSubType<ByPixelsValues>
  data: ProductData
}

function ByPixelsConfirmOrder({
  className,
  style,
  data,
  children,
  formik,
  ...rest
}: ByPixelsConfirmOrderProps) {
  return (
    <ByPixelsConfirmOrderSC className={className} style={style} {...rest}>
      <Col justify={'between'} className={'full-height'}>
        <Col align={'center'} style={padding(0, 50)}>
          <Title style={marginBottom(58)}>CONFIRM YOUR ORDER</Title>
          <Row gap={30}>
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
            <Col>
              <Calculate data={data} />
              <Area name={'PRICE'} style={margin(10, 0, 20)}>
                <div className={'price text-center'}>
                  <Text type={'XL'}>{data.price} ETH</Text>
                  <Text type={'S'}>+ GAS FEES</Text>
                </div>
              </Area>
              <Col gap={20} className={'overflow-anywhere'}>
                {formik.values.image && !formik.errors.image && (
                  <>
                    <Text type={'MGray'}>
                      Image Type:{' '}
                      <Text type={'M'}>{formik.values.image?.name.split('.').pop()}</Text>
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
            </Col>
          </Row>
        </Col>
        {children}
      </Col>
    </ByPixelsConfirmOrderSC>
  )
}

export default memo(ByPixelsConfirmOrder)
