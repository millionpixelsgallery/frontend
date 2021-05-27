import { CSSProperties, memo, useCallback, useMemo } from 'react'
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

export type Wallets = 'metamask' | 'fortmatic' | 'portis' | 'torus'
export const supportedImageExtensions = ['gif', 'jpeg', 'png']

function ByPixels({ className, step, data, onChangeStep, style, ...rest }: ByPixelsProps) {
  const formik = useForm({
    initialValues: initialValues,
    validationSchema: useValidationSchema((yup, E) => ({
      image: yup.mixed().test('supported', E.INVALID_IMAGE_FORMAT, (file) => {
        if (!file) return true
        return supportedImageExtensions.includes(file.name.toLowerCase().split('.').pop()!)
      }),
    })),
    onSubmit: async (values) => {
      console.log(values)
    },
  })

  const handleSelectWallet = useCallback(() => {
    onChangeStep(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNextStep = useCallback(() => {
    onChangeStep(step + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  const handleSkipStep = useCallback(() => {
    formik.resetForm()
    onChangeStep(step + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  const Bottom = useMemo(
    () => (
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
            <Button width={140}>CONFIRM</Button>
          )}
        </Row>
      </Row>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step]
  )

  const Step = () =>
    useMemo(() => {
      switch (step) {
        case 0:
          return <ByPixelsSelectWallet onSelect={handleSelectWallet} />
        case 1:
          return <ByPixelsReviewPixels data={data}>{Bottom}</ByPixelsReviewPixels>
        case 2:
          return <ByPixelsUploadPhoto formik={formik}>{Bottom}</ByPixelsUploadPhoto>
        case 3:
          return (
            <ByPixelsConfirmOrder formik={formik} data={data}>
              {Bottom}
            </ByPixelsConfirmOrder>
          )
        default:
          return null
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step, formik, Bottom, data])

  return (
    <ByPixelsSC className={className} style={style} {...rest}>
      {Step()}
    </ByPixelsSC>
  )
}

export default memo(ByPixels)
