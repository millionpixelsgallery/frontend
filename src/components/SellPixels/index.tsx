import { CSSProperties, memo, useCallback } from 'react'
import { SellPixelsSC, SellPixelsSCProps } from './styled'
import useValidationSchema from 'hooks/useValidationSchema'
import useForm from 'hooks/useForm'
import { Col, Row } from 'components/ui/Grid'
import Title from 'components/ui/Title'
import { marginBottom } from 'utils/style/indents'
import Field from 'components/ui/Field'
import Input from 'components/ui/Input'
import Text from 'components/ui/Text'
import Radio from 'components/ui/Radio'
import Button from 'components/ui/Button'

export interface SellPixelsProps extends SellPixelsSCProps {
  className?: string
  style?: CSSProperties
}

const initialValues = {
  price: '',
  duration: '',
}

export enum DurationEnum {
  Day = 'day',
  Week = 'week',
  Month = 'month',
}

function SellPixels({ className, style, ...rest }: SellPixelsProps) {
  const formik = useForm({
    initialValues: initialValues,
    validationSchema: useValidationSchema((yup, E) => ({})),
    onSubmit: async (values) => {
      console.log(values)
    },
  })

  const handleChangePrice = useCallback(
    (e) => {
      formik.setFieldValue('price', e.currentTarget.value.replace(/[^0-9.]+|\.(?=\.)/g, ''))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formik.setFieldValue]
  )

  return (
    <SellPixelsSC className={className} style={style} {...rest}>
      <Col align={'center'}>
        <Title style={marginBottom(100)}>SELL your pixels</Title>
        <Field name={'price'} title={'SET PRICE in ETH'} style={marginBottom(8)}>
          <Input
            placeholder='ENTER YOUR PRICE'
            value={formik.values.price}
            onChange={handleChangePrice}
          />
        </Field>
        <Text type={'MGray'} style={marginBottom(50)}>
          + Our FEE is 3.75%
        </Text>
        <Text type={'M'} style={marginBottom(20)}>
          SET SALE DURATION:
        </Text>
        <Row gap={56}>
          <Row gap={15}>
            <Radio
              name={'duration'}
              value={DurationEnum.Day}
              checked={formik.values.duration === DurationEnum.Day}
              onChange={formik.handleChange}
            />
            <Text type={'M'}>1 DAY</Text>
          </Row>
          <Row gap={15}>
            <Radio
              name={'duration'}
              value={DurationEnum.Week}
              checked={formik.values.duration === DurationEnum.Week}
              onChange={formik.handleChange}
            />
            <Text type={'M'}>7 DAYS</Text>
          </Row>
          <Row gap={15}>
            <Radio
              name={'duration'}
              value={DurationEnum.Month}
              checked={formik.values.duration === DurationEnum.Month}
              onChange={formik.handleChange}
            />
            <Text type={'M'}>30 DAYS</Text>
          </Row>
        </Row>
      </Col>
      <Button width={200}>LIST FOR SALE</Button>
    </SellPixelsSC>
  )
}

export default memo(SellPixels)
