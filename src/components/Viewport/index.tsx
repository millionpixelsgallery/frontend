import { CSSProperties, memo, useCallback, useLayoutEffect, useRef, useState } from 'react'
import Grid from 'components/Viewport/Grid'
import { ViewportContentSC, ViewportSC } from 'components/Viewport/styled'
import panzoom, { Transform } from 'panzoom'
import Select from 'components/Viewport/Select'
import { between } from 'utils/canvas'

export interface ViewportProps {
  className?: string
  style?: CSSProperties
}

function Viewport({ className, style }: ViewportProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState<Transform | undefined>(undefined)
  useLayoutEffect(() => {
    const instance = panzoom(contentRef.current!, {
      minZoom: 1,
      maxZoom: 40,
      bounds: true,
      boundsPadding: 1,
      zoomDoubleClickSpeed: 1,
      beforeMouseDown(e) {
        if (e.target instanceof SVGElement) return true
        if (instance.getTransform().scale === 1) return true
      },
    })
    instance.on('transform', () => {
      const transform = instance.getTransform()
      setTransform({ ...transform })
    })
  }, [])

  const [selectCords, setSelectCords] = useState<[x1: number, y1: number, x2: number, y2: number]>([
    10, 10, 110, 80,
  ])

  const [x1, y1, x2, y2] = selectCords
  const handleSelectMove = useCallback((dx, dy) => {
    setSelectCords(([x1, y1, x2, y2]) => {
      if (dx < 0) {
        dx = Math.max(x1 + dx, 0) - x1
      } else if (dx > 0) {
        dx = Math.min(x2 + dx, 1000) - x2
      }

      if (dy < 0) {
        dy = Math.max(y1 + dy, 0) - y1
      } else if (dy > 0) {
        dy = Math.min(y2 + dy, 1000) - y2
      }

      return [x1 + dx, y1 + dy, x2 + dx, y2 + dy]
    })
  }, [])

  const handleSelectResize = useCallback((dx, dy, [kx1, ky1, kx2, ky2]) => {
    setSelectCords(([x1, y1, x2, y2]) => [
      between(x1 + dx * kx1, 0, x2 - 1),
      between(y1 + dy * ky1, 0, y2 - 1),
      between(x2 + dx * kx2, x1 + 1, 1000),
      between(y2 + dy * ky2, y1 + 1, 1000),
    ])
  }, [])

  const handleSelectEnd = useCallback(() => {
    setSelectCords(([x1, y1, x2, y2]) => [
      Math.round(x1),
      Math.round(y1),
      Math.round(x2),
      Math.round(y2),
    ])
  }, [])

  return (
    <ViewportSC className={className} style={style}>
      <ViewportContentSC ref={contentRef}>
        <Grid hidden={!(transform?.scale && transform.scale >= 15)} />
        <Select
          x={Math.round(x1)}
          y={Math.round(y1)}
          width={Math.round(x2 - x1)}
          height={Math.round(y2 - y1)}
          scale={transform?.scale}
          onMove={handleSelectMove}
          onResize={handleSelectResize}
          onMouseUp={handleSelectEnd}
        />
      </ViewportContentSC>
    </ViewportSC>
  )
}

export default memo(Viewport)
