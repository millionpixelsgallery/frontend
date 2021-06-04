import { CSSProperties, memo, useLayoutEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Application, Sprite, Graphics, Container } from 'pixi.js'

export interface CanvasProps {
  className?: string
  style?: CSSProperties
}

const CanvasSC = styled.canvas`
  position: absolute;
  left: 0;
  top: 0;
  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: optimize-contrast;
  image-rendering: pixelated;
  -ms-interpolation-mode: nearest-neighbor;
  image-rendering: crisp-edges;
  filter: none;
  -moz-filter: blur(0);
  -ms-filter: blur(0);
  filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius="0");
`

function Canvas({ className, style }: CanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [app, setApp] = useState<Application>()

  useLayoutEffect(() => {
    const app = new Application({
      view: ref.current!,
      width: 1000,
      height: 1000,
      backgroundColor: 0xf8f8f8,
      autoStart: false,
    })

    if (process.env.NODE_ENV === 'development') {
      // @ts-ignore
      window.app = app
    }

    setApp(app)
  }, [])

  useMemo(() => {
    if (!app) return

    drawRect(app, {
      x: 475,
      y: 475,
      width: 50,
      height: 50,
      fill: 0xeaeaea,
    })
    drawRect(app, {
      x: 495,
      y: 495,
      width: 10,
      height: 10,
      fill: 0xdddddd,
    })

    const size = 100
    for (let x = 0; x < 1000; x += size) {
      for (let y = 0; y < 1000; y += size) {
        const image = new Image()
        image.src = `https://loremflickr.com/${size}/${size}?t=${x}${y}`
        image.crossOrigin = ''
        image.onload = () => {
          const sprite = Sprite.from(image)
          sprite.x = x
          sprite.y = y
          sprite.width = size
          sprite.height = size
          sprite.interactive = true
          sprite.buttonMode = true
          app.stage.addChild(sprite)
          app.render()
        }
      }
    }
    app.render()
  }, [app])

  return <CanvasSC className={className} style={style} ref={ref} width={1000} height={1000} />
}

interface ReactOptions {
  x: number
  y: number
  width: number
  height: number
  fill?: number | [color?: number, alpha?: number]
  lineStyle?: [width: number, color?: number, alpha?: number, alignment?: number, native?: boolean]
}

function drawRect(
  container: Container | Application,
  { x, y, width, height, fill, lineStyle }: ReactOptions
) {
  const graphic = new Graphics()
  graphic.beginFill(...(Array.isArray(fill) ? fill : [fill]))
  graphic.drawRect(x, y, width, height)
  if (lineStyle) graphic.lineStyle(...lineStyle)
  graphic.endFill()
  if ('addChild' in container) container.addChild(graphic)
  else container.stage.addChild(graphic)
}

export default memo(Canvas)
