import styled from 'styled-components'
import { AreaSC } from 'components/ui/Area/styled'
import { InputSC } from 'components/ui/Input/styled'

export interface ByPixelsUploadPhotoSCProps {}

export interface EllipsisDivSCProps {
  maxWidth?: number | string
}

export const EllipsisDivSC = styled.div<EllipsisDivSCProps>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: ${({ maxWidth, theme }) => (maxWidth !== undefined ? theme.px(maxWidth) : 'inherit')};
`

export const ByPixelsUploadPhotoSC = styled.div<ByPixelsUploadPhotoSCProps>`
  height: 100%;
  .full-height {
    height: 100%;
  }
  .full-width-input {
    width: 100%;
    ${AreaSC} {
      width: 100%;
      border-width: 1px;
    }
  }
  .input-text-start {
    ${InputSC} {
      margin-left: 5px;
      text-align: start;
    }
  }
  .upload-area {
    padding-left: 0;
    padding-right: 0;
    border-style: dashed;
    border-width: 1px;
    width: 700px;
    &.uploadError {
      border: 2px dashed ${({ theme }) => theme.color.card.error};
    }
  }
  ${InputSC} {
    text-transform: uppercase;
  }
`
