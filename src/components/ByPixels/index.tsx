import { CSSProperties, memo, useCallback, useEffect, useState } from 'react'
import { ByPixelsSC, ByPixelsSCProps } from './styled'
import ByPixelsSelectWallet from 'components/ByPixels/ByPixelsSelectWallet'
import ByPixelsReviewPixels from 'components/ByPixels/ByPixelsReviewPixels'
import ByPixelsUploadPhoto from 'components/ByPixels/ByPixelsUploadPhoto'
import ByPixelsConfirmOrder from 'components/ByPixels/ByPixelsConfirmOrder'
import { Row } from 'components/ui/Grid'
import ProcessBar from 'components/ui/ProcessBar'
import Button from 'components/ui/Button'
import { padding } from 'utils/style/indents'
import useValidationSchema from 'hooks/useValidationSchema'
import useForm from 'hooks/useForm'
import { useApiConnect, useApiMethods } from 'hooks/useApi'
import { upload } from 'lib/nft'
import { cratePlaceHolderFile } from 'utils/cratePlaceHolderFile'

export interface ProductData {
  width: number
  height: number
  position: {
    x: number
    y: number
  }
  price: number
}

export interface ByPixelsProps extends ByPixelsSCProps {
  className?: string
  style?: CSSProperties
  step: number
  onChangeStep: (step: number) => void
  onClose: () => void
  data: ProductData
}

const initialValues = {
  link: '',
  title: '',
  image: null,
}

export type ByPixelsValues = {
  link: string
  title: string
  image: null | File
}

export const supportedImageExtensions = ['jpeg', 'png', 'jpg']

function ByPixels({ className, step, data, onChangeStep, style, onClose, ...rest }: ByPixelsProps) {
  const [loading, setLoading] = useState(false)
  const methods = useApiMethods()
  const connect = useApiConnect()
  const formik = useForm({
    initialValues: initialValues,
    validationSchema: useValidationSchema((yup, E) => ({
      image: yup.mixed().test('supported', E.INVALID_IMAGE_FORMAT, (file) => {
        if (!file) return true
        return supportedImageExtensions.includes(file.name.toLowerCase().split('.').pop()!)
      }),
    })),
    onSubmit: async (values) => {
      setLoading(true)
      try {
        await methods?.buyPixels(
          [data.position.x, data.position.y, data.width, data.height],
          await upload(
            Boolean(values.image)
              ? values.image!
              : await cratePlaceHolderFile(data.width, data.height),
            values.title,
            values.link
          )
        )
        setLoading(false)
      } catch (e) {
        setLoading(false)
      }
      onClose()
      onChangeStep(0)
    },
  })
  useEffect(() => {
    if (!methods) {
      onChangeStep(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelectWallet = useCallback(async (wallet) => {
    await connect(wallet)
    onChangeStep(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNextStep = useCallback(async () => {
    onChangeStep(step + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  const handleSkipStep = useCallback(() => {
    formik.resetForm()
    onChangeStep(step + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  const Bottom = (
    <Row justify={'between'} align={'center'} style={padding(0, 50, 50, 30)}>
      <ProcessBar steps={['REview', 'Upload', 'CONFIRM']} currentStep={step - 1} />
      <Row justify={'end'} gap={50}>
        {step === 2 && (
          <Button width={140} type={'underline'} onClick={handleSkipStep}>
            SKIP FOR NOW
          </Button>
        )}
        {step !== 3 ? (
          <Button width={140} onClick={handleNextStep}>
            NEXT
          </Button>
        ) : (
          <Button width={140} onClick={formik.submitForm} loading={loading}>
            CONFIRM
          </Button>
        )}
      </Row>
    </Row>
  )

  return (
    <ByPixelsSC className={className} style={style} {...rest}>
      {step === 0 ? (
        <ByPixelsSelectWallet onSelect={handleSelectWallet} />
      ) : step === 1 ? (
        <ByPixelsReviewPixels data={data}>{Bottom}</ByPixelsReviewPixels>
      ) : step === 2 ? (
        <ByPixelsUploadPhoto title={'UPLOAD YOUR PHOTO (*OPTIONAL)'} data={data} formik={formik}>
          {Bottom}
        </ByPixelsUploadPhoto>
      ) : step === 3 ? (
        <ByPixelsConfirmOrder formik={formik} data={data}>
          {Bottom}
        </ByPixelsConfirmOrder>
      ) : null}
    </ByPixelsSC>
  )
}

export default memo(ByPixels)
