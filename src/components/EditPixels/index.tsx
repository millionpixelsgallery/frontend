import { CSSProperties, memo, useCallback, useEffect } from 'react'
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

export interface EditPixelsProps extends EditPixelsSCProps {
  className?: string
  style?: CSSProperties
  step: number
  onChangeStep: (step: number) => void
  onClose: () => void
  data: EditProductData
  image: {
    image: string
    link: string
    title: string
  }
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
  ...rest
}: EditPixelsProps) {
  const methods = useApiMethods()

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
      await methods?.setIpfs(
        data.index,
        await upload(
          Boolean(image) ? image! : await cratePlaceHolderFile(data.width, data.height),
          values.title,
          values.link
        )
      )
      onClose()
      onChangeStep(0)
    },
  })

  useEffect(() => {
    fetch(image.image).then((res) =>
      res.blob().then((blob) => {
        if (blob.type.split('/').pop()!.toLowerCase().includes('svg')) return
        formik.setFieldValue(
          'image',
          new File([blob], `image.${blob.type.split('/').pop()!.toLowerCase()}`, {
            type: blob.type,
          })
        )
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image.image])

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
        <Button width={140} onClick={formik.submitForm}>
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
        <EditPixelsConfirmEdit data={data} formik={formik}>
          {Bottom}
        </EditPixelsConfirmEdit>
      ) : null}
    </EditPixelsSC>
  )
}

export default memo(EditPixels)
