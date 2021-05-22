import { CSSProperties, memo, useCallback, useEffect, useState } from 'react'
import { RadioSC, RadioSCProps } from './styled'
import { ReactComponent as Checked } from './assets/checked.svg'
import { ReactComponent as Unchecked } from './assets/unchecked.svg'

export interface RadioProps extends Omit<JSX.IntrinsicElements['input'], 'ref'>, RadioSCProps {
  style?: CSSProperties
  checked?: boolean
}

function Radio({ className, style, checked, onChange, ...inputProps }: RadioProps) {
  const [controlledChecked, setControlledChecked] = useState(false)

  const handleChange = useCallback(
    (e) => {
      setControlledChecked((value) => !value)
      if (onChange) onChange(e)
    },
    [onChange]
  )

  useEffect(() => {
    if (checked !== undefined) setControlledChecked(checked)
  }, [checked])

  return (
    <RadioSC className={className} style={style}>
      <input
        type='radio'
        onChange={handleChange}
        checked={checked ?? controlledChecked}
        {...inputProps}
      />
      {checked ?? controlledChecked ? <Checked /> : <Unchecked />}
    </RadioSC>
  )
}

export default memo(Radio)
