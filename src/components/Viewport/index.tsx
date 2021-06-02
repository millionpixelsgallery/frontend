import { CSSProperties, memo, useLayoutEffect, useRef, useState } from 'react'
import Grid from 'components/Viewport/Grid'
import { ViewportContentSC, ViewportSC } from 'components/Viewport/styled'
import panzoom, { Transform } from 'panzoom'
import Select from 'components/Viewport/Select'

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
    })
    instance.on('transform', () => {
      const transform = instance.getTransform()
      setTransform({ ...transform })
    })
  }, [])

  return (
    <ViewportSC className={className} style={style}>
      <ViewportContentSC ref={contentRef}>
        <Grid />
        <Select x={10} y={10} width={2} height={2} scale={transform?.scale} />
      </ViewportContentSC>
    </ViewportSC>
  )
}

export default memo(Viewport)
