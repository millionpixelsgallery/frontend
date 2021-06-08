import { CSSProperties, memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Application, Sprite, Graphics, Container } from 'pixi.js'

export interface CanvasProps {
  className?: string
  style?: CSSProperties
  pixels?: Array<Omit<PixelsProps, 'container' | 'render'>>
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

function Canvas({ className, style, pixels }: CanvasProps) {
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

    app.render = app.render.bind(app)

    setApp(app)

    return () => app.destroy(false)
  }, [])

  useEffect(() => app?.render())

  return (
    <>
      <CanvasSC className={className} style={style} ref={ref} width={1000} height={1000} />
      {app && (
        <>
          <Rect container={app.stage} x={475} y={475} width={50} height={50} fill={0xeaeaea} />
          <Rect container={app.stage} x={495} y={495} width={10} height={10} fill={0xdddddd} />
          {pixels?.map((props) => (
            <Pixels
              key={`${props.x}${props.y}${props.selling}${props.src}`}
              container={app.stage}
              render={app.render}
              {...props}
            />
          ))}
        </>
      )}
    </>
  )
}

interface RectProps {
  container: Container
  x: number
  y: number
  width: number
  height: number
  fill?: number | [color?: number, alpha?: number]
  lineStyle?: [width: number, color?: number, alpha?: number, alignment?: number, native?: boolean]
  clickable?: boolean
  onClick?: (data: { x: number; y: number; width: number; height: number }) => void
}

function Rect({ container, x, y, width, height, fill, lineStyle, clickable, onClick }: RectProps) {
  const [graphic, destroy] = useMemo(() => {
    const graphic = new Graphics()
    graphic.beginFill(...(Array.isArray(fill) ? fill : [fill]))
    if (lineStyle) graphic.lineStyle(...lineStyle)
    graphic.drawRect(x, y, width, height)
    graphic.endFill()
    graphic.interactive = clickable
    graphic.buttonMode = clickable
    if (onClick) graphic.on('click', () => onClick({ x, y, width, height }))
    container.addChild(graphic)

    return [
      graphic,
      () => {
        graphic.destroy()
      },
    ] as const
  }, [])

  useMemo(() => {
    if (graphic) {
      graphic.interactive = clickable
      graphic.buttonMode = clickable
    }
  }, [clickable])

  useEffect(() => destroy, [])

  return null
}

interface PixelsProps extends Pick<RectProps, 'clickable' | 'onClick'> {
  container: Container
  render: () => void
  x: number
  y: number
  width: number
  height: number
  src?: string
  selling?: boolean
}
function Pixels(props: PixelsProps) {
  const { container, x, y, width, height, selling, src, render, clickable, onClick } = props

  const onSale = useRef(typeof selling === 'boolean')
  if (onSale.current) {
    return (
      <Rect
        container={container}
        x={x}
        y={y}
        width={width}
        height={height}
        fill={selling ? [0xa9f99e, 0.5] : [0xfe504f, 0.5]}
        lineStyle={selling ? [1, 0x90ab9d, 1, 0] : [1, 0xfe504f, 1, 0]}
        clickable={clickable}
        onClick={onClick}
      />
    )
  } else {
    // eslint-disable-next-line
    const [sprite, setSprite] = useState<Sprite>()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMemo(() => {
      const image = new Image()
      image.src = src!
      image.crossOrigin = ''
      image.onload = () => {
        const sprite = Sprite.from(image)
        sprite.x = x
        sprite.y = y
        sprite.width = width
        sprite.height = height
        sprite.interactive = clickable
        sprite.buttonMode = clickable
        if (onClick) sprite.on('click', () => onClick({ x, y, width, height }))
        container.addChild(sprite)
        setSprite(sprite)
      }
    }, [src])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMemo(() => {
      if (sprite) {
        sprite.interactive = clickable
        sprite.buttonMode = clickable
      }
      // eslint-disable-next-line
    }, [clickable])

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (sprite) render()
      return () => {
        sprite?.destroy()
      }
      // eslint-disable-next-line
    }, [sprite])

    return null
  }
}

export default memo(Canvas)
