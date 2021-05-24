import { CSSProperties, memo, ReactNode } from 'react'
import { ProcessBarSC, ProcessBarSCProps } from './styled'
import cn from 'classnames'
import { Col } from 'components/ui/Grid'

export interface ProcessBarProps extends ProcessBarSCProps {
  className?: string
  style?: CSSProperties
  currentStep?: number
  steps: ReactNode[]
}

function ProcessBar({ className, style, currentStep = 0, steps, ...rest }: ProcessBarProps) {
  return (
    <ProcessBarSC className={className} style={style} {...rest}>
      {steps.map((step, index) => (
        <Col
          className={cn('step', {
            last: index < currentStep,
            current: index === currentStep,
            next: index > currentStep,
          })}
          align={'center'}
          key={index}
        >
          <div className={'token'} />
          <span>{step}</span>
        </Col>
      ))}
    </ProcessBarSC>
  )
}

export default memo(ProcessBar)
