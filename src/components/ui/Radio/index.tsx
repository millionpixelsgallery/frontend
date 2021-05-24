import { CSSProperties, memo } from 'react'
import { RadioSC, RadioSCProps } from './styled'

export interface RadioProps extends Omit<JSX.IntrinsicElements['input'], 'ref'>, RadioSCProps {
  style?: CSSProperties
}

function Radio({ className, style, ...inputProps }: RadioProps) {
  return (
    <RadioSC className={className} style={style}>
      <input type='radio' {...inputProps} />
      <svg
        width='20'
        height='20'
        viewBox='0 0 22 22'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect x='1' y='1' width='20' height='20' rx='10' />
        <circle cx='11' cy='11' r='5.5' />
      </svg>
    </RadioSC>
  )
}

export default memo(Radio)
