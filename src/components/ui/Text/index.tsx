import { CSSProperties, memo } from 'react'
import { TextSC } from './styled'

export interface TextProps extends Omit<JSX.IntrinsicElements['span'], 'ref'> {
  className?: string
  style?: CSSProperties
  type?: 'XL' | 'L' | 'M' | 'S' | 'LGray' | 'MGray'
  /**
   * 'XL' - normal normal 600 22px/24px
   * 'L' - normal normal normal 18px/28px
   * 'M' - normal normal normal 16px/24px
   * 'S' - normal normal normal 14px/21px
   */
  block?: boolean
  color?: string
  weight?: number
  size?: number | string
  lineHeight?: number | string
  letterSpacing?: number | string
  as?: keyof JSX.IntrinsicElements
}

function Text({
  className,
  style,
  children,
  type = 'L',
  block,
  color,
  lineHeight,
  letterSpacing,
  weight,
  size,
  ...rest
}: TextProps) {
  return (
    <TextSC
      className={className}
      $block={block}
      $color={color}
      $weight={weight}
      $size={size}
      style={style}
      $type={type}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      {...rest}
    >
      {children}
    </TextSC>
  )
}

export default memo(Text)
