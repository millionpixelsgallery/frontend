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
import { usePixelsController } from 'hooks/usePixels'

export interface SellPixelsProps extends SellPixelsSCProps {
  className?: string
  style?: CSSProperties
  index: number
  onChangeDisabledControlButtons: (disabled: boolean) => void
  onClose: () => void
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
  onChangeDisabledControlButtons,
}: SellPixelsProps) {
  const methods = useApiMethods()
  const [loading, setLoading] = useState(false)
  const { fetchPixels } = usePixelsController()

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
        await methods?.sellPixels(index, +values.price, duration)
      } finally {
        onChangeDisabledControlButtons(false)
        setLoading(false)
        onClose()
        await fetchPixels()
      }
    },
  })

  return (
    <SellPixelsSC className={className} style={style}>
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
