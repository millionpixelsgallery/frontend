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
import { usePixelsController } from 'hooks/usePixels'
import { urlRegExp } from 'utils/link'

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
}: EditPixelsProps) {
  const methods = useApiMethods()
  const { fetchPixels } = usePixelsController()
  const [loading, setLoading] = useState('')
  const onTxHash = useCallback(
    (hash) => {
      console.log('got tx hash:', { hash })
      setLoading('pending tx confirmation')
    },
    [setLoading]
  )
  const formik = useForm({
    initialValues: {
      link: image.link,
      title: image.title,
      image: null,
    },
    validationSchema: useValidationSchema((yup, E) => ({
      title: yup.string().max(100),
      link: yup.string().max(750).matches(urlRegExp),
      image: yup.mixed().test('supported', E.INVALID_IMAGE_FORMAT, (file) => {
        if (!file) return true
        return supportedImageExtensions.includes(file.name.toLowerCase().split('.').pop()!)
      }),
    })),
    onSubmit: async (values) => {
      let image = values.image
      setLoading('Uploading To IPFS')
      onChangeDisabledControlButtons(true)
      try {
        const ipfs = await upload(
          Boolean(image) ? image! : await cratePlaceHolderFile(data.width, data.height),
          values.title,
          values.link
        )
        setLoading('Pending wallet confirm')
        await methods?.setIpfs(data.index, ipfs, onTxHash)
      } finally {
        onChangeDisabledControlButtons(false)
        setLoading('')
        onChangeStep(0)
        onClose()
        await fetchPixels()
      }
    },
  })

  const handleNextStep = useCallback(async () => {
    if (step === 0) {
      const errors = await formik.validateForm()
      formik.setTouched(
        {
          image: true,
          title: true,
          link: true,
        },
        false
      )
      if (Object.keys(errors).length) return
    }
    onChangeStep(step + 1)
  }, [step])

  const Bottom = (
    <Row justify={'end'} style={padding(0, 50, 50)}>
      {step == 0 ? (
        <Button
          width={140}
          onClick={handleNextStep}
          disabled={
            !(
              formik.values.title &&
              formik.values.link &&
              !Object.values(formik.errors).some(Boolean)
            )
          }
        >
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
    <EditPixelsSC className={className} style={style}>
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
