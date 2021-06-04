import styled from 'styled-components'
import { ButtonSC } from 'components/ui/Button/styled'

export interface PixelsDetailsRowSCProps extends Omit<JSX.IntrinsicElements['li'], 'ref'> {}

export const PixelsDetailsRowSC = styled.li<PixelsDetailsRowSCProps>`
  .photo-area {
    .name-wrapper {
      text-transform: uppercase;
    }
    padding: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 200px;
    height: 200px;
  }

  .photo-area .image {
    height: 50%;
    width: 50%;
  }

  .details-col {
    min-width: 550px;
  }

  .details-row {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ${ButtonSC} {
    height: 32px;
    width: 76px;
  }
`

export const ImgDivSC = styled.div<{ $src: string }>`
  background-image: url(${({ $src }) => $src});
  background-position: center;
  background-size: cover;
`
