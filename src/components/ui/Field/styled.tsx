import styled from 'styled-components'
import { Row } from 'components/ui/Grid'

export interface FieldSCProps {}

export const FieldSC = styled.div<FieldSCProps>`
  display: inline-block;
`

export const FieldLabelSC = styled.label`
  font-size: 16px;
  letter-spacing: 0.32px;
  color: ${({ theme }) => theme.color.typography.text};
  text-transform: uppercase;
`

export const FieldRowSC = styled(Row)`
  align-items: baseline;
  justify-content: center;
  > * {
    flex: 1 1;
  }
`

export const FieldPrefixSC = styled.div`
  flex: 0 0;
  letter-spacing: 0.28px;
  font-size: 14px;
  text-transform: uppercase;
`

export const FieldPostfixSC = styled.div`
  flex: 0 0;
  letter-spacing: 0.28px;
  font-size: 14px;
  text-transform: uppercase;
`
