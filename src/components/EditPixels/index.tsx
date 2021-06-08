import { CSSProperties, memo, useCallback, useState } from 'react'
import { EditPixelsSC, EditPixelsSCProps } from './styled'
import { Row } from 'components/ui/Grid'
import Button from 'components/ui/Button'
import useValidationSchema from 'hooks/useValidationSchema'
import useForm from 'hooks/useForm'
import ByPixelsUploadPhoto from 'components/ByPixels/ByPixelsUploadPhoto'
import EditPixelsConfirmEdit from 'components/EditPixels/EditPixelsConfirmEdit'
import { padding } from 'utils/style/indents'
import { useApiMethods } from 'hooks/useApi'
import { upload } from 'lib/nft'
import { cratePlaceHolderFile } from 'utils/cratePlaceHolderFile'

export interface EditProductData {
  width: number
  height: number
  index: number
  position: {
    x: number
    y: number
  }
  price: number
}

export interface ImageData {
  image: string
  link: string
  title: string
}

export interface EditPixelsProps extends EditPixelsSCProps {
  className?: string
  style?: CSSProperties
  step: number
  onChangeStep: (step: number) => void
  onChangeDisabledControlButtons: (disabled: boolean) => void
  onClose: () => void
  data: EditProductData
  image: ImageData
}
export const supportedImageExtensions = ['jpeg', 'png', 'jpg']

function EditPixels({
  className,
  step,
  data,
  onChangeStep,
  onClose,
  style,
  image,
  onChangeDisabledControlButtons,
  ...rest
}: EditPixelsProps) {
  const methods = useApiMethods()
  const [loading, setLoading] = useState(false)
  const formik = useForm({
    initialValues: {
      link: image.link,
      title: image.title,
      image: null,
    },
    validationSchema: useValidationSchema((yup, E) => ({
      image: yup.mixed().test('supported', E.INVALID_IMAGE_FORMAT, (file) => {
        if (!file) return true
        return supportedImageExtensions.includes(file.name.toLowerCase().split('.').pop()!)
      }),
    })),
    onSubmit: async (values) => {
      let image = values.image
      setLoading(true)
      onChangeDisabledControlButtons(true)
      try {
        await methods?.setIpfs(
          data.index,
          await upload(
            Boolean(image) ? image! : await cratePlaceHolderFile(data.width, data.height),
            values.title,
            values.link
          )
        )
        onChangeDisabledControlButtons(false)
        setLoading(false)
        onChangeStep(0)
        onClose()
      } catch (e) {
        console.log(e)
        onChangeDisabledControlButtons(false)
        setLoading(false)
        onClose()
      }
    },
  })

  const handleNextStep = useCallback(() => {
    onChangeStep(step + 1)
  }, [step])

  const Bottom = (
    <Row justify={'end'} style={padding(0, 50, 50)}>
      {step == 0 ? (
        <Button width={140} onClick={handleNextStep}>
          NEXT
        </Button>
      ) : (
        <Button width={140} onClick={formik.submitForm} loading={loading}>
          CONFIRM
        </Button>
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
        <EditPixelsConfirmEdit data={data} image={image} formik={formik}>
          {Bottom}
        </EditPixelsConfirmEdit>
      ) : null}
    </EditPixelsSC>
  )
}

export default memo(EditPixels)
