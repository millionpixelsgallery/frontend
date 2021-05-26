import { memo } from 'react'
import { InputSC, InputSCProps, InputWrapperSC, InputWrapperSCProps } from './styled'
import MaskedInput, { MaskedInputProps } from 'react-text-mask'

export type InputProps = InputSCProps &
  InputWrapperSCProps &
  (Omit<JSX.IntrinsicElements['input'], 'ref'> | MaskedInputProps)

function Input({ className, style, maxWidth, ...props }: InputProps) {
  return (
    <InputWrapperSC className={className} style={style} maxWidth={maxWidth}>
      <InputSC as={'mask' in props ? MaskedInput : undefined} {...props} />
    </InputWrapperSC>
  )
}

export default memo(Input)
