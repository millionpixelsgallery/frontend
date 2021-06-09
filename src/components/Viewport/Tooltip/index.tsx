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
import { useEventListener } from 'hooks/useEventListener'
import useRenderRef from 'hooks/useRenderRef'
import { LinkSC } from 'components/ui/Link/styled'

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
  onClose?: () => void
}

const TooltipSC = styled.div`
  transform-origin: 0 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  min-width: 320px;

  ${LinkSC}, .pixel-title {
    max-width: 300px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const root = document.getElementById('root')!

function Tooltip({
  className,
  style,
  children,
  targetX,
  targetY,
  targetWidth,
  targetHeight,
  transform = { scale: 1, x: 0, y: 0 },
  onClose,
}: TooltipProps) {
  const [hidden, toggleHidden] = useTrigger(true)
  const ref = useRef<HTMLDivElement>(null)
  const { x: tx, y: ty, scale } = transform
  const gap = 15 / scale
  let offsetX = targetX
  let offsetY = targetY + targetHeight + gap

  const tooltipWidth = useMemo(() => ref.current?.offsetWidth ?? 0, [ref.current]) / scale
  const tooltipHeight = useMemo(() => ref.current?.offsetHeight ?? 0, [ref.current]) / scale

  const right = Math.abs(tx) / scale + 1000 / scale
  const bottom = Math.abs(ty) / scale + 1000 / scale

  if (bottom - gap < offsetY + tooltipHeight) {
    if (tooltipHeight > targetHeight) {
      offsetY = targetY - tooltipHeight - gap
    } else {
      offsetY = targetY + gap
      offsetX += gap
    }
  }

  if (tooltipWidth > targetWidth && right - gap < offsetX + tooltipWidth) {
    offsetX = targetX - (tooltipWidth - targetWidth)
    if (tooltipHeight < targetHeight) {
      offsetX -= gap
    }
  }

  useLayoutEffect(() => toggleHidden(), [])

  const renderRef = useRenderRef()
  useEventListener(
    root,
    'click',
    (e) => {
      if (renderRef.first) return
      if (!(e.target === ref.current || ref.current?.contains(e.target as Node | null))) {
        // if (onClose) onClose()
      }
    },
    [onClose]
  )

  return (
    <TooltipSC
      ref={ref}
      className={className}
      style={{
        ...style,
        visibility: hidden ? 'hidden' : 'visible',
        transform: ` translate(${offsetX}px, ${offsetY}px) scale(${1 / scale})`,
      }}
    >
      {children}
    </TooltipSC>
  )
}

export default memo(Tooltip)
