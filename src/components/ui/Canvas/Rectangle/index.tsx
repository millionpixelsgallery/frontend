import { memo } from 'react'
import useStatic from 'hooks/useStatic'
import { Texture, Sprite } from 'pixi.js'
import { useCanvasContainer } from 'components/ui/Canvas/hooks'

export interface RectangleProps {
  color?: number
  x?: number
  y?: number
  width: number
  height: number
}

function Rectangle({ color = 0xffffff, x = 0, y = 0, width, height }: RectangleProps) {
  const container = useCanvasContainer()

  const rect = useStatic(() => Sprite.from(Texture.WHITE))

  rect.tint = color
  rect.x = x
  rect.y = y
  rect.width = width
  rect.height = height

  useStatic(() => container.addChild(rect))
  return null
}

export default memo(Rectangle)
