import { CSSProperties, memo, useCallback } from 'react'
import { EditPixelsSC, EditPixelsSCProps } from './styled'
import { Row } from 'components/ui/Grid'
import Button from 'components/ui/Button'
import useValidationSchema from 'hooks/useValidationSchema'
import useForm from 'hooks/useForm'
import ByPixelsUploadPhoto from 'components/ByPixels/ByPixelsUploadPhoto'
import EditPixelsConfirmEdit from 'components/EditPixels/EditPixelsConfirmEdit'
import { padding } from 'utils/style/indents'

export interface ProductData {
  width: number
  height: number
  position: {
    x: number
    y: number
  }
  price: number
}

export interface EditPixelsProps extends EditPixelsSCProps {
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

export const supportedImageExtensions = ['gif', 'jpeg', 'png', 'jpg']

function EditPixels({ className, step, data, onChangeStep, style, ...rest }: EditPixelsProps) {
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

  const handleNextStep = useCallback(() => {
    onChangeStep(step + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  const Bottom = (
    <Row justify={'end'} style={padding(0, 50, 50)}>
      {step == 0 ? (
        <Button width={140} onClick={handleNextStep}>
          NEXT
        </Button>
      ) : (
        <Button width={140}>CONFIRM</Button>
      )}
    </Row>
  )

  return (
    <EditPixelsSC className={className} style={style} {...rest}>
      {step === 0 ? (
        <ByPixelsUploadPhoto title={'EDIT YOUR NFT'} data={data} formik={formik}>
          {Bottom}
        </ByPixelsUploadPhoto>
      ) : step === 1 ? (
        <EditPixelsConfirmEdit formik={formik}>{Bottom}</EditPixelsConfirmEdit>
      ) : null}
    </EditPixelsSC>
  )
}

export default memo(EditPixels)
