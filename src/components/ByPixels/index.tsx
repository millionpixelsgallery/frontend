import { CSSProperties, memo, useMemo } from 'react'
import { ByPixelsSC, ByPixelsSCProps } from './styled'
import ByPixelsSelectWallet from 'components/ByPixels/ByPixelsSelectWallet'
import ByPixelsReviewPixels from 'components/ByPixels/ByPixelsReviewPixels'
import ByPixelsUploadPhoto from 'components/ByPixels/ByPixelsUploadPhoto'
import ByPixelsConfirmOrder from 'components/ByPixels/ByPixelsConfirmOrder'
import { Row } from 'components/ui/Grid'
import ProcessBar from 'components/ui/ProcessBar'
import Button from 'components/ui/Button'
import { padding } from 'utils/style/indents'

export interface ByPixelsProps extends ByPixelsSCProps {
  className?: string
  style?: CSSProperties
  step: number
  onChangeStep: (step: number) => void
}

export type Wallets = 'metamask' | 'fortmatic' | 'portis' | 'torus'

function ByPixels({ className, step, onChangeStep, style, ...rest }: ByPixelsProps) {
  const handleSelectWallet = (wallet: Wallets) => {
    onChangeStep(1)
  }

  const Bottom = useMemo(
    () => (
      <Row justify={'between'} align={'center'} style={padding(0, 50, 50, 30)}>
        <ProcessBar steps={['REview', 'Upload', 'CONFIRM']} currentStep={step - 1} />
        <Row justify={'end'} gap={50}>
          {step === 2 && <Button width={140}>NEXT</Button>}
          {step !== 3 ? <Button width={140}>NEXT</Button> : <Button width={140}>CONFIRM</Button>}
        </Row>
      </Row>
    ),
    [step]
  )

  const Step = () => {
    switch (step) {
      case 0:
        return <ByPixelsSelectWallet onSelect={handleSelectWallet} />
      case 1:
        return <ByPixelsReviewPixels>{Bottom}</ByPixelsReviewPixels>
      case 2:
        return <ByPixelsUploadPhoto>{Bottom}</ByPixelsUploadPhoto>
      case 3:
        return <ByPixelsConfirmOrder>{Bottom}</ByPixelsConfirmOrder>
      default:
        return null
    }
  }

  return (
    <ByPixelsSC className={className} style={style} {...rest}>
      <Step />
    </ByPixelsSC>
  )
}

export default memo(ByPixels)
