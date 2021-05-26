import { CSSProperties, memo, ReactNode, ReactNodeArray } from 'react'
import { AreaSC, AreaSCProps } from './styled'

export interface AreaProps extends AreaSCProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode | ReactNodeArray
  name: ReactNode
}

function Area({
  className,
  style,
  children,
  name,
  borderColor = 'rgba(11,7,66,0.15)',
  ...rest
}: AreaProps) {
  return (
    <AreaSC className={className} style={style} borderColor={borderColor} {...rest}>
      <div className='name-wrapper'>{name}</div>
      {children}
    </AreaSC>
  )
}

export default memo(Area)
