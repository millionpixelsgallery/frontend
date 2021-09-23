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
import { defaults, isEqual, pick } from 'lodash'
import { getLocalCache, setLocalCache } from 'utils/cache'

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

const defaultValues = {
  link: '',
  title: '',
  image: undefined,
}

type PendingBuy = {
  ipfs?: string
  commitHash?: string
  image?: string
  imageName?: string
  title?: string
  link?: string
  area?: Array<number>
  nonce: number
}

export type ByPixelsValues = {
  link: string
  title: string
  image: undefined | File
}

export const supportedImageExtensions = ['jpeg', 'png', 'jpg']
const getPendingBuy = () => getLocalCache('pendingBuy', {} as PendingBuy)
const setPendingBuy = (data: object) => setLocalCache('pendingBuy', data)
const fileToBase64 = async (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })
}

const base64ToFile = async (dataUrl: string, fileName: string): Promise<File> => {
  const mime = dataUrl.match(/:(.*?);/) || []
  const res: Response = await fetch(dataUrl)
  const blob: Blob = await res.blob()
  return new File([blob], fileName, { type: mime[1] })
}

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
  const onTxHash = useCallback(
    (hash) => {
      console.log('got tx hash:', { hash })
      setLoading('pending tx confirmation')
    },
    [setLoading]
  )
  const formik = useForm({
    initialValues: defaultValues,
    validationSchema: useValidationSchema((yup, E) => ({
      title: yup.string().max(100),
      link: yup.string().max(750).matches(urlRegExp),
      image: yup.mixed().test('supported', E.INVALID_IMAGE_FORMAT, (file) => {
        if (!file) return true
        return supportedImageExtensions.includes(file.name.toLowerCase().split('.').pop()!)
      }),
    })),
    onSubmit: async (values) => {
      try {
        const pendingBuy = getPendingBuy()
        console.debug(pendingBuy)
        let ipfs = pendingBuy.ipfs
        onChangeDisabledControlButtons(true)
        if (ipfs) {
          console.log('skipping ipfs', pendingBuy.ipfs)
        } else {
          console.debug('uploading...', { values })
          setLoading('Uploading To IPFS')
          ipfs = await upload(
            Boolean(values.image)
              ? values.image!
              : await cratePlaceHolderFile(data.width, data.height),
            values.title,
            values.link
          )
          pendingBuy.title = values.title
          pendingBuy.link = values.link
          pendingBuy.image = values.image && (await fileToBase64(values.image as unknown as File))
          pendingBuy.imageName = values.image && (values.image as unknown as File).name
          pendingBuy.ipfs = ipfs
          setPendingBuy(pendingBuy)
        }
        if (isReSell) {
          setLoading('Pending wallet confirm')
          await methods?.buyPixelsForSale(data.index as number, ipfs, onTxHash)
        } else {
          onTxHash('')
          const hash = await commitPromise
          setLoading('Pending wallet confirm')
          pendingBuy.commitHash = hash
          setPendingBuy(pendingBuy)
          await methods?.buyPixels(
            [data.position.x, data.position.y, data.width, data.height],
            pendingBuy.nonce,
            pendingBuy.ipfs as string,
            onTxHash
          )
        }
        setPendingBuy({})
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

  //restore previous state if process stopped in the middle
  useEffect(() => {
    const setValues = async (values: any) => {
      if (values.image) {
        values.image = await base64ToFile(values.image, values.imageName)
        console.debug({ values })
      }
      formik.setValues(values)
    }

    //if no wallet
    if (!methods) {
      return onChangeStep(0)
    }
    const pendingBuy = getPendingBuy()

    //if area changed reset
    const area = [data.position.x, data.position.y, data.width, data.height]
    if (pendingBuy.area && false === isEqual(area, pendingBuy.area)) {
      setPendingBuy({})
      onChangeStep(1)
    }

    //restore form saved values
    if (step === 1) {
      const values = defaults(pick(pendingBuy, ['title', 'link', 'image']), defaultValues)
      setValues(values).then((_) => {
        //if has a pending commit
        if (pendingBuy.commitHash) {
          //if also uploaded to ipfs then skip to last step
          if (pendingBuy.ipfs) {
            return onChangeStep(3)
          }

          return onChangeStep(2)
        }
      })
    }
  }, [step, data, formik])

  const handleSelectWallet = useCallback(async (wallet) => {
    await connect(wallet)
    onChangeStep(1)
  }, [])

  const handleNextStep = useCallback(async () => {
    switch (step) {
      case 1:
        if (methods && isReSell === false) {
          setLoading('Pending wallet confirm')
          const pendingBuy = getPendingBuy()
          const nonce = pendingBuy.nonce || Math.random() * 1e10
          const promise = methods.commit(
            [data.position.x, data.position.y, data.width, data.height],
            nonce,
            (txHash) => {
              setPendingBuy({
                nonce,
                area: [data.position.x, data.position.y, data.width, data.height],
              })
              setLoading('')
              onChangeStep(step + 1)
            }
          )
          promise.catch((e: Error) => {
            console.error('commit failed', e.message, e)
            setLoading('')
          })
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
