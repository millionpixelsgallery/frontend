import { HTMLProps, memo, ReactElement, useLayoutEffect, useRef, useState } from 'react'
import {
  Application as PixiApplication,
  IApplicationOptions as PixiApplicationOptions,
  Renderer,
} from 'pixi.js'
import {
  CanvasAppContext,
  CanvasContainerContext,
  CanvasRendererContext,
} from 'components/ui/Canvas/hooks'

export interface CanvasProps
  extends Pick<HTMLProps<HTMLCanvasElement>, 'id' | 'className' | 'style'> {
  children?: ReactElement | ReactElement[]
  width: number
  height: number
  options: Omit<PixiApplicationOptions, 'width' | 'height' | 'view'>
}

function Canvas({ children, width, height, options, ...restProps }: CanvasProps) {
  const $wrapper = useRef<HTMLCanvasElement>(null)
  const [app, setApp] = useState<PixiApplication>()

  useLayoutEffect(() => {
    const pixi = new PixiApplication({
      width,
      height,
      view: $wrapper.current!,
      antialias: true,
      ...options,
    })

    setApp(pixi)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CanvasAppContext.Provider value={app}>
      <CanvasContainerContext.Provider value={app?.stage}>
        <CanvasRendererContext.Provider value={app?.renderer as Renderer}>
          <canvas ref={$wrapper} width={width} height={height} {...restProps} />
          {app && children}
        </CanvasRendererContext.Provider>
      </CanvasContainerContext.Provider>
    </CanvasAppContext.Provider>
  )
}

export default memo(Canvas)
