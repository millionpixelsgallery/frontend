import { CSSProperties, memo, ReactNode } from 'react'
import { ButtonSC } from './styled'

export type ButtonTypes = 'default' | 'outlined' | 'outlined_orange' | 'wrapper' | 'underline'
export type ButtonSizes = 'sm' | 'md' | 'lg' | 'content'

export interface ButtonProps
  extends Omit<JSX.IntrinsicElements['button'], 'size' | 'type' | 'ref'> {
  className?: string
  style?: CSSProperties
  type?: ButtonTypes
  size?: ButtonSizes
  fontSize?: number
  width?: number
  disabled?: boolean
  shadow?: boolean
  children: ReactNode
}

function Button({
  className,
  style,
  type = 'default',
  size = 'lg',
  shadow,
  fontSize,
  width,
  children,
  disabled = false,
  ...rest
}: ButtonProps) {
  return (
    <ButtonSC
      className={className}
      style={style}
      $type={type}
      $size={size}
      fontSize={fontSize}
      $width={width}
      $shadow={shadow}
      $disabled={disabled}
      {...rest}
    >
      {children}
    </ButtonSC>
  )
}

export default memo(Button)
