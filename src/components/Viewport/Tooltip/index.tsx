import {
  CSSProperties,
  memo,
  ReactNode,
  ReactNodeArray,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react'
import styled from 'styled-components'
import useTrigger from 'hooks/useTrigger'
import { Transform } from 'panzoom'

export interface TooltipProps {
  targetX: number
  targetY: number
  targetWidth: number
  targetHeight: number
  transform: Transform | undefined
  width?: number
  height?: number
  className?: string
  style?: CSSProperties
  children?: ReactNode | ReactNodeArray
}

const TooltipSC = styled.div`
  transform-origin: 0 0;
  position: absolute;
  top: 0;
  left: 0;
`

function Tooltip({
  className,
  style,
  children,
  targetX,
  targetY,
  targetWidth,
  targetHeight,
  transform = { scale: 1, x: 0, y: 0 },
  width = 320,
  height,
}: TooltipProps) {
  const [hidden, toggleHidden] = useTrigger(true)
  const ref = useRef<HTMLDivElement>(null)
  const { x: tx, y: ty, scale } = transform
  const gap = 15 / scale
  let offsetX = targetX
  let offsetY = targetY + targetHeight + gap

  const tooltipWidth = width / scale
  const tooltipHeight =
    useMemo(() => height ?? ref.current?.offsetHeight ?? 0, [ref.current, height]) / scale

  const right = Math.abs(tx) / scale + 1000 / scale
  const bottom = Math.abs(ty) / scale + 1000 / scale

  if (tooltipWidth > targetWidth && right - gap < offsetX + tooltipWidth) {
    offsetX = targetX - (tooltipWidth - targetWidth)
  }
  if (bottom - gap < offsetY + tooltipHeight) {
    offsetY = targetY - tooltipHeight - gap
  }

  useLayoutEffect(() => toggleHidden(), [])

  return (
    <TooltipSC
      ref={ref}
      className={className}
      style={{
        ...style,
        visibility: hidden ? 'hidden' : 'visible',
        width,
        transform: ` translate(${offsetX}px, ${offsetY}px) scale(${1 / scale})`,
      }}
    >
      {children}
    </TooltipSC>
  )
}

export default memo(Tooltip)
