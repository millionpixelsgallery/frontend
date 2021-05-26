import { memo } from 'react'
import useStatic from 'hooks/useStatic'
import { Graphics } from 'pixi.js'
import { useCanvasContainer } from 'components/ui/Canvas/hooks'

export interface RectangleProps {
  color?: number
  x?: number
  y?: number
  width: number
  height: number
  alpha?: number
  borderColor?: number
  borderWidth?: number
}

function Rectangle({
  color = 0xffffff,
  x = 0,
  y = 0,
  width,
  height,
  alpha = 1,
  borderWidth,
  borderColor,
}: RectangleProps) {
  const container = useCanvasContainer()

  const graphic = useStatic(() => new Graphics())

  graphic.clear()
  if (borderWidth) graphic.lineStyle(borderWidth, borderColor, 1, 0)
  graphic.beginFill(color, alpha)
  graphic.drawRect(x, y, width, height)
  graphic.endFill()

  useStatic(() => container.addChild(graphic))
  return null
}

export default memo(Rectangle)
