import { CSSProperties, memo, useState } from 'react'
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
import { maskInt2 } from 'utils/masks'
import { useApiMethods } from 'hooks/useApi'

export interface SellPixelsProps extends SellPixelsSCProps {
  className?: string
  style?: CSSProperties
  index: number
  onChangeDisabledControlButtons: (disabled: boolean) => void
  onClose: () => void
  getData?: () => void
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

function SellPixels({
  className,
  style,
  onClose,
  index,
  getData,
  onChangeDisabledControlButtons,
  ...rest
}: SellPixelsProps) {
  const methods = useApiMethods()
  const [loading, setLoading] = useState(false)

  const formik = useForm({
    initialValues: initialValues,
    validationSchema: useValidationSchema((yup) => ({
      price: yup.string().required(),
      duration: yup.string().required(),
    })),
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true)
      let duration = 1
      if (values.duration === 'week') duration = 7
      if (values.duration === 'day') duration = 1
      if (values.duration === 'month') duration = 30
      onChangeDisabledControlButtons(true)
      try {
        console.log(index, +values.price, duration)
        await methods?.sellPixels(index, +values.price, duration)
        onChangeDisabledControlButtons(false)
        setLoading(false)
        getData && getData()
        onClose()
      } catch (e) {
        console.log(e)
        onChangeDisabledControlButtons(false)
        setLoading(false)
        onClose()
      }
    },
  })

  return (
    <SellPixelsSC className={className} style={style} {...rest}>
      <Col align={'center'}>
        <Title style={marginBottom(100)}>SELL your pixels</Title>
        <Field name={'price'} title={'SET PRICE in ETH'} style={marginBottom(8)}>
          <Input
            placeholder='ENTER YOUR PRICE'
            value={formik.values.price}
            onBlur={formik.handleBlur}
            mask={maskInt2}
            onChange={formik.handleChange}
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
      <Button
        disabled={!(formik.isValid && formik.dirty)}
        onClick={formik.submitForm}
        loading={loading}
        width={200}
      >
        LIST FOR SALE
      </Button>
    </SellPixelsSC>
  )
}

export default memo(SellPixels)
