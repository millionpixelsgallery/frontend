import { cloneElement, CSSProperties, memo, ReactElement, ReactNode } from 'react'
import {
  FieldLabelSC,
  FieldPostfixSC,
  FieldPrefixSC,
  FieldRowSC,
  FieldSC,
  FieldSCProps,
} from './styled'
import Area from 'components/ui/Area'
import useStatic from 'hooks/useStatic'
import { v4 } from 'uuid'

export interface FieldProps extends FieldSCProps {
  className?: string
  style?: CSSProperties
  name: string
  title?: string
  children?: ReactElement<{ id: string; name: string }>
  prefix?: ReactNode
  postfix?: ReactNode
  error?: any // TODO no error UI for now
}

function Field({ className, style, children, name, title, prefix, postfix, ...rest }: FieldProps) {
  const id = useStatic(() => `${name}:${v4().slice(0, 8)}`)
  return (
    <FieldSC className={className} style={style} {...rest}>
      <Area name={<FieldLabelSC htmlFor={id}>{title ?? name}</FieldLabelSC>}>
        <FieldRowSC>
          <FieldPrefixSC>{prefix}</FieldPrefixSC>
          {children && cloneElement(children, { id, name })}
          <FieldPostfixSC>{postfix}</FieldPostfixSC>
        </FieldRowSC>
      </Area>
    </FieldSC>
  )
}

export default memo(Field)
