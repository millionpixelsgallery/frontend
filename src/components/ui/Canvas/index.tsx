import {
  createContext,
  HTMLProps,
  memo,
  ReactElement,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'

export interface CanvasProps
  extends Pick<HTMLProps<HTMLCanvasElement>, 'id' | 'className' | 'style'>,
    Pick<PIXI.IApplicationOptions, 'backgroundColor'> {
  children?: ReactElement | ReactElement[]
  width: number
  height: number
}

const PixiApplicationContext =
  createContext<(PIXI.Application & { viewport: Viewport }) | undefined>(undefined)

export function usePixiApp() {
  return useContext(PixiApplicationContext)!
}

function Canvas({ children, width, height, backgroundColor, ...restProps }: CanvasProps) {
  const $wrapper = useRef<HTMLCanvasElement>(null)
  const [app, setApp] = useState<PIXI.Application & { viewport: Viewport }>()

  useLayoutEffect(() => {
    const pixi: typeof app = new PIXI.Application({
      width,
      height,
      view: $wrapper.current!,
      backgroundColor,
      antialias: true,
    }) as PIXI.Application & { viewport: Viewport }
    ;(window as any).app = pixi

    const viewport = new Viewport({
      screenWidth: width,
      screenHeight: height,
      worldWidth: width,
      worldHeight: height,
      interaction: pixi.renderer.plugins.interaction,
    })
    pixi.stage.addChild(viewport)
    pixi.viewport = viewport
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
        maxScale: 20,
      })

    const sprite = viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
    sprite.tint = 0xff0000
    sprite.width = sprite.height = 100
    sprite.position.set(100, 100)

    setApp(pixi)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PixiApplicationContext.Provider value={app}>
      <canvas
        ref={$wrapper}
        width={width}
        height={height}
        style={{ position: 'relative' }}
        {...restProps}
      />
      {app && children}
    </PixiApplicationContext.Provider>
  )
}

export default memo(Canvas)
