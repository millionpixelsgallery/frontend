import { CSSProperties, memo } from 'react'
import { ByPixelsSC, ByPixelsSCProps } from './styled'
// import ByPixelsSelectWallet from 'components/ByPixels/ByPixelsSelectWallet'
// import ByPixelsReviewPixels from 'components/ByPixels/ByPixelsReviewPixels'
// import ByPixelsUploadPhoto from 'components/ByPixels/ByPixelsUploadPhoto'
// import ByPixelsConfirmOrder from 'components/ByPixels/ByPixelsConfirmOrder'
// import { Row } from 'components/ui/Grid'
// import ProcessBar from 'components/ui/ProcessBar'
// import Button from 'components/ui/Button'

export interface ByPixelsProps extends ByPixelsSCProps {
  className?: string
  style?: CSSProperties
  step?: number
  onChangeStep?: (step: number) => void
}

function ByPixels({ className, step, onChangeStep, style, ...rest }: ByPixelsProps) {
  // const Bottom = useMemo(
  //   () => (
  //     <Row justify={'between'}>
  //       <ProcessBar steps={['REview', 'Upload', 'CONFIRM']} currentStep={step} />
  //       <Row justify={'end'} gap={50}>
  //         {step === 2 && <Button width={140}>NEXT</Button>}
  //         {step !== 3 ? <Button width={140}>NEXT</Button> : <Button width={140}>CONFIRM</Button>}
  //       </Row>
  //     </Row>
  //   ),
  //   [step]
  // )
  //
  // const getStep = () =>
  //   useMemo(() => {
  //     switch (step) {
  //       case 0:
  //         return <ByPixelsSelectWallet />
  //       case 1:
  //         return <ByPixelsReviewPixels>{Bottom}</ByPixelsReviewPixels>
  //       case 2:
  //         return <ByPixelsUploadPhoto />
  //       case 3:
  //         return <ByPixelsConfirmOrder />
  //     }
  //   }, [step])

  return (
    <ByPixelsSC className={className} style={style} {...rest}>
      {/*{getStep()}*/}
    </ByPixelsSC>
  )
}

export default memo(ByPixels)
