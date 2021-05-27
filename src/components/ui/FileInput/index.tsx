import { cloneElement, memo, ReactElement, useCallback, useRef } from 'react'

export interface FileInputProps extends Omit<JSX.IntrinsicElements['input'], 'ref' | 'type'> {
  children: ReactElement<{ onClick: () => void }>
  name?: string
  error?: boolean
  multiple?: boolean
  onValueChange?: (name: string, value: FileList | File) => void
}

function FileInput({
  children,
  onChange,
  onValueChange,
  name,
  multiple,
  error,
  ...inputProps
}: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleClick = useCallback(() => fileInputRef.current?.click(), [])
  const handleChange = useCallback(
    (e) => {
      if (onChange) onChange(e)
      if (onValueChange && e.target.files.length) {
        if (name) {
          onValueChange(name, multiple ? Array.from(e.target.files) : e.target.files[0])
        } else {
          console.warn(
            'prop "onValueChange" passed in a FileInput but "name" not defined, "onValueChange" ignored'
          )
        }
      }
    },
    [name, multiple, onChange, onValueChange]
  )

  return (
    <>
      <input
        type='file'
        hidden
        ref={fileInputRef}
        name={name}
        value=''
        multiple={multiple}
        onChange={handleChange}
        {...inputProps}
      />
      {cloneElement(children, { onClick: handleClick })}
    </>
  )
}

export default memo(FileInput)
