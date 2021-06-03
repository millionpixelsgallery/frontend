import { memo, useCallback, MouseEvent as ReactMouseEvent, useState, useEffect } from 'react'
import { SelectSC, SelectSCProps } from './styled'

export interface SelectProps extends SelectSCProps {
  x: number
  y: number
  width: number
  height: number
  scale: number | undefined
  onResize?: (
    deltaX: number,
    deltaY: number,
    direction: [x1: number, y1: number, x2: number, y2: number]
  ) => void
  onMove?: (deltaX: number, deltaY: number) => void
  onMouseUp?: (e: MouseEvent) => void
}

function useEventListener<E extends HTMLElement, K extends keyof HTMLElementEventMap>(
  element: E,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  deps: any[] = [],
  options?: boolean | AddEventListenerOptions
) {
  useEffect(() => {
    element.addEventListener(type, listener, options)
    return () => {
      element.removeEventListener(type, listener, options)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, type, listener, options, ...deps])
}

function Select({ x, y, width, height, scale = 1, onResize, onMove, onMouseUp }: SelectProps) {
  const strokeWidth = 1 / scale
  const resizeRectWidth = 10 / scale
  const boxTranslate = `translate(-${resizeRectWidth / 2 - strokeWidth / 2}, -${
    resizeRectWidth / 2 - strokeWidth / 2
  })`

  const [dragging, setDragging] = useState(false)
  const [resizeDir, setResizeDir] =
    useState<[x1: number, y1: number, x2: number, y2: number] | null>(null)

  const handleMouseDown = useCallback((e: ReactMouseEvent) => {
    e.preventDefault()
    if (e.target instanceof SVGRectElement && e.target.dataset.type === 'resize') {
      setResizeDir(e.target.dataset.direction!.split('').map(Number) as any)
    } else {
      setDragging(true)
    }
    document.body.style.cursor = 'pointer'
  }, [])
  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      setDragging(false)
      setResizeDir(null)
      if (onMouseUp) onMouseUp(e)
      document.body.style.removeProperty('cursor')
    },
    [onMouseUp]
  )
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragging) {
        if (onMove) onMove(e.movementX / scale, e.movementY / scale)
      }
      if (resizeDir) {
        if (onResize) onResize(e.movementX / scale, e.movementY / scale, resizeDir)
      }
    },
    [dragging, resizeDir, onResize, onMove, scale]
  )

  useEventListener(document.documentElement, 'mouseup', handleMouseUp)
  useEventListener(document.documentElement, 'mousemove', handleMouseMove)

  return (
    <SelectSC
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      overflow={'visible'}
      onMouseDown={handleMouseDown}
    >
      <rect
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        width={Math.max(0.001, width - strokeWidth)}
        height={Math.max(0.001, height - strokeWidth)}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#eeeeee'
        fillOpacity={0.3}
        data-data-type='selection'
      />
      <rect
        x={0}
        y={0}
        width={resizeRectWidth}
        height={resizeRectWidth}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#ffffff'
        transform={boxTranslate}
        data-type='resize'
        data-direction='1100'
      />
      <rect
        x={'100%'}
        y={0}
        width={resizeRectWidth}
        height={resizeRectWidth}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#ffffff'
        transform={boxTranslate}
        data-type='resize'
        data-direction='0110'
      />
      <rect
        x={0}
        y={'100%'}
        width={resizeRectWidth}
        height={resizeRectWidth}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#ffffff'
        transform={boxTranslate}
        data-type='resize'
        data-direction='1001'
      />
      <rect
        x={'100%'}
        y={'100%'}
        width={resizeRectWidth}
        height={resizeRectWidth}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#ffffff'
        transform={boxTranslate}
        data-type='resize'
        data-direction='0011'
      />

      <rect
        x={'50%'}
        y={0}
        width={resizeRectWidth}
        height={resizeRectWidth}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#ffffff'
        transform={boxTranslate}
        visibility={width * scale > 25 ? 'visible' : 'hidden'}
        data-type='resize'
        data-direction='0100'
      />
      <rect
        x={'50%'}
        y={'100%'}
        width={resizeRectWidth}
        height={resizeRectWidth}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#ffffff'
        transform={boxTranslate}
        visibility={width * scale > 25 ? 'visible' : 'hidden'}
        data-type='resize'
        data-direction='0001'
      />
      <rect
        x={'100%'}
        y={'50%'}
        width={resizeRectWidth}
        height={resizeRectWidth}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#ffffff'
        transform={boxTranslate}
        visibility={height * scale > 25 ? 'visible' : 'hidden'}
        data-type='resize'
        data-direction='0010'
      />
      <rect
        x={0}
        y={'50%'}
        width={resizeRectWidth}
        height={resizeRectWidth}
        stroke='#000000'
        strokeWidth={strokeWidth}
        fill='#ffffff'
        transform={boxTranslate}
        visibility={height * scale > 25 ? 'visible' : 'hidden'}
        data-type='resize'
        data-direction='1000'
      />
    </SelectSC>
  )
}

export default memo(Select)
