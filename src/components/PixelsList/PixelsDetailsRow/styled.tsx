import styled from 'styled-components'

export interface PixelsDetailsRowSCProps extends Omit<JSX.IntrinsicElements['li'], 'ref'> {}

export const PixelsDetailsRowSC = styled.li<PixelsDetailsRowSCProps>`
  .your-photo {
    width: 200px;
    height: 200px;

    border: 2px solid ${({ theme }) => theme.color.pixelsList.hrBorder};
    border-radius: 5px;
  }
`
