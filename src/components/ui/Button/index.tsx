import { CSSProperties, memo, ReactNode } from 'react'
import { ButtonSC } from './styled'
import Spinner from '../Spinner'
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
  loading?: string
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
  loading = '',
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
      $disabled={disabled || loading != ''}
      disabled={disabled || loading != ''}
      {...rest}
    >
      {loading ? (
        <div style={{ display: 'flex' }}>
          <span>{loading}</span>
          <span>
            <Spinner />
          </span>
        </div>
      ) : (
        children
      )}
    </ButtonSC>
  )
}

export default memo(Button)
