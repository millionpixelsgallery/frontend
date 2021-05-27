import { CSSProperties, memo } from 'react'
import { BurgerSC, BurgerSCProps } from './styled'
import { Col } from 'components/ui/Grid'
import { margin } from 'utils/style/indents'

export interface BurgerProps extends BurgerSCProps {
  className?: string
  style?: CSSProperties
}

function Burger({ className, style, ...rest }: BurgerProps) {
  return (
    <BurgerSC className={className} style={style} {...rest}>
      <Col style={margin(3, 0, 0, 4)}>
        <div className={'burger'}></div>
        <div className={'burger'}></div>
        <div className={'burger'}></div>
      </Col>
    </BurgerSC>
  )
}

export default memo(Burger)
