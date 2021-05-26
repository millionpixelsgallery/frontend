import styled from 'styled-components'
import { PixelsDetailsRowSC } from 'components/PixelsList/PixelsDetailsRow/styled'

export interface PixelsListSCProps extends Omit<JSX.IntrinsicElements['ul'], 'ref'> {
  $showFirstTopBorder?: boolean
}

export const PixelsListSC = styled.ul<PixelsListSCProps>`
  list-style: none;
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.color.typography.text ?? 'inherit'};

  ${PixelsDetailsRowSC} {
    border-bottom: 2px solid ${({ theme }) => theme.color.pixelsList.hrBorder};
  }

  ${PixelsDetailsRowSC}:first-child {
    border-top: ${({ theme, $showFirstTopBorder }) =>
      $showFirstTopBorder ? '2px solid ' + theme.color.pixelsList.hrBorder : 'none'};
  }
`
