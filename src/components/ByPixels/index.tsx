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
import { usePixelsController } from 'hooks/usePixels'

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
  onChangeDisabledControlButtons: (disabled: boolean) => void
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

function ByPixels({
  className,
  step,
  data,
  onChangeStep,
  onChangeDisabledControlButtons,
  style,
  onClose,
}: ByPixelsProps) {
  const pixels = usePixelsController()
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
      onChangeDisabledControlButtons(true)
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
        onChangeStep(0)
      } finally {
        onChangeDisabledControlButtons(false)
        onClose()
        setLoading(false)
        pixels.setSelectionActive(false)
        await pixels.fetchPixels()
      }
    },
  })
  useEffect(() => {
    if (!methods) {
      onChangeStep(0)
    }
  }, [])

  const handleSelectWallet = useCallback(async (wallet) => {
    await connect(wallet)
    onChangeStep(1)
  }, [])

  const handleNextStep = useCallback(async () => {
    onChangeStep(step + 1)
  }, [step])

  const handleSkipStep = useCallback(() => {
    formik.resetForm()
    onChangeStep(step + 1)
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
    <ByPixelsSC className={className} style={style}>
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
