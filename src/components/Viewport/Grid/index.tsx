import { memo } from 'react'
import styled from 'styled-components'

export interface GridProps {}

const Grid = styled.div<GridProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: 1px 1px;
  background-position: -0.025px -0.025px;
  background-image: linear-gradient(90deg, #ececec 0.05px, transparent 0),
    linear-gradient(180deg, #ececec 0.05px, transparent 0);
`

export default memo(Grid)
