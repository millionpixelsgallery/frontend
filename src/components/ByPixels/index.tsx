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
import { urlRegExp } from 'utils/link'

export interface ProductData {
  width: number
  height: number
  position: {
    x: number
    y: number
  }
  price: number
  index?: number
}

export interface ByPixelsProps extends ByPixelsSCProps {
  className?: string
  style?: CSSProperties
  step: number
  onChangeStep: (step: number) => void
  onChangeDisabledControlButtons: (disabled: boolean) => void
  onClose: () => void
  data: ProductData
  firstBuy?: boolean
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
  firstBuy,
}: ByPixelsProps) {
  console.log({ data })
  const isReSell = data.index != null
  const [commitPromise, setCommitPromise] = useState(Promise.resolve(''))
  const pixels = usePixelsController()
  const [loading, setLoading] = useState('')
  const methods = useApiMethods()
  const connect = useApiConnect()
  const formik = useForm({
    initialValues: initialValues,
    validationSchema: useValidationSchema((yup, E) => ({
      title: yup.string().max(100),
      link: yup.string().max(750).matches(urlRegExp),
      image: yup.mixed().test('supported', E.INVALID_IMAGE_FORMAT, (file) => {
        if (!file) return true
        return supportedImageExtensions.includes(file.name.toLowerCase().split('.').pop()!)
      }),
    })),
    onSubmit: async (values) => {
      setLoading('Uploading To IPFS')
      onChangeDisabledControlButtons(true)
      try {
        const ipfs = await upload(
          Boolean(values.image)
            ? values.image!
            : await cratePlaceHolderFile(data.width, data.height),
          values.title,
          values.link
        )
        setLoading('Pending wallet confirm')

        if (isReSell) {
          await methods?.buyPixelsForSale(data.index as number, ipfs)
        } else {
          const random = await commitPromise
          await methods?.buyPixels(
            [data.position.x, data.position.y, data.width, data.height],
            random,
            ipfs
          )
        }
      } catch (e) {
        console.error('error while buying pixels', e)
      } finally {
        onChangeStep(0)
        onChangeDisabledControlButtons(false)
        onClose()
        setLoading('')
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
    switch (step) {
      case 1:
        if (methods && isReSell === false) {
          setLoading('Pending wallet confirm')
          const promise = methods.commit(
            [data.position.x, data.position.y, data.width, data.height],
            () => {
              setLoading('')
              onChangeStep(step + 1)
            }
          )
          promise.catch((_) => setLoading(''))
          setCommitPromise(promise)
        } else onChangeStep(step + 1)
        break
      case 2:
        onChangeStep(step + 1)
        break
      case 3:
        formik.submitForm()
        break
    }
  }, [step])

  const handleSkipStep = useCallback(() => {
    formik.resetForm()
    onChangeStep(step + 1)
  }, [step])

  const StepButton = () => {
    const disabled =
      step == 2 &&
      !(Object.values(formik.values).every(Boolean) && !Object.values(formik.errors).some(Boolean))
    const texts = [isReSell ? 'Next' : 'Lock & Next', 'Next', 'Confirm']
    return (
      <Button
        style={{ minWidth: '140px' }}
        onClick={handleNextStep}
        disabled={disabled}
        loading={loading}
      >
        {texts[step - 1]}
      </Button>
    )
  }
  const Bottom = (
    <Row justify={'between'} align={'center'} style={padding(0, 50, 50, 30)}>
      <ProcessBar steps={['Review & Lock', 'Upload', 'CONFIRM']} currentStep={step - 1} />
      <Row justify={'end'} gap={50}>
        {step === 2 && (
          <Button width={140} type={'underline'} onClick={handleSkipStep}>
            SKIP FOR NOW
          </Button>
        )}
        <StepButton />
      </Row>
    </Row>
  )

  return (
    <ByPixelsSC className={className} style={style}>
      {step === 0 ? (
        <ByPixelsSelectWallet onSelect={handleSelectWallet} fullTitle={firstBuy} />
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
