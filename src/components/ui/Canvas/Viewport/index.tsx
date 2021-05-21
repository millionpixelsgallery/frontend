import { memo, ReactNode, ReactNodeArray } from 'react'
import { CanvasContainerContext, useCanvasApp } from 'components/ui/Canvas/hooks'
import useStatic from 'hooks/useStatic'
import { Viewport as PixiViewport } from 'pixi-viewport'

export interface ViewportProps {
  children?: ReactNode | ReactNodeArray
  onZoomed?: (e: any) => void
}

function Viewport({ children, onZoomed }: ViewportProps) {
  const app = useCanvasApp()

  const viewport = useStatic(() => {
    const viewport = new PixiViewport({
      screenWidth: app.renderer.width,
      screenHeight: app.renderer.height,
      worldWidth: app.renderer.width,
      worldHeight: app.renderer.height,
      interaction: app.renderer.plugins.interaction,
    })
    app.stage.addChild(viewport)
    viewport
      .drag()
      .pinch()
      .wheel()
      .decelerate()
      .clamp({
        direction: 'all',
      })
      .clampZoom({
        minScale: 1,
        maxScale: 15,
      })
    viewport.on('zoomed', (e) => onZoomed && onZoomed(e))
    return viewport
  })

  return (
    <CanvasContainerContext.Provider value={viewport}>{children}</CanvasContainerContext.Provider>
  )
}

export default memo(Viewport)
