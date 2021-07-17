import { memo } from 'react'
import { InputSC, InputSCProps, InputWrapperSC, InputWrapperSCProps } from './styled'
import MaskedInput, { MaskedInputProps } from 'react-text-mask'
import cn from 'classnames'

export type InputProps = InputSCProps &
  InputWrapperSCProps &
  (Omit<JSX.IntrinsicElements['input'], 'ref'> | MaskedInputProps) & { error?: boolean }

function Input({ className, style, maxWidth, error, ...props }: InputProps) {
  return (
    <InputWrapperSC className={className} style={style} maxWidth={maxWidth}>
      <InputSC
        className={cn({ error })}
        as={'mask' in props ? MaskedInput : undefined}
        {...props}
      />
    </InputWrapperSC>
  )
}

export default memo(Input)
