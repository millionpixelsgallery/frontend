import React from 'react'
import styled, { keyframes } from 'styled-components'

interface Props {
  delay: string
}
const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 5px }
  100% { margin-bottom: 0 }
`
const DotWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
`
const Dot = styled.div<Props>`
  opacity: 1;
  background-color: white;
  border-radius: 50%;
  width: 3px;
  height: 3px;
  margin: 0 2px;
  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(props) => props.delay};
`

const LoadingDots = (props: any) => (
  <DotWrapper {...props}>
    <Dot delay='0s' />
    <Dot delay='.1s' />
    <Dot delay='.2s' />
  </DotWrapper>
)
export default LoadingDots
