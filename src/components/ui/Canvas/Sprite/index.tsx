import { memo, useEffect } from 'react'
import useStatic from 'hooks/useStatic'
import { Sprite as _Sprite } from 'pixi.js'
import { useCanvasContainer } from 'components/ui/Canvas/hooks'

export interface SpriteProps {
  x: number
  y: number
  width: number
  height: number
  src: string
}

function Sprite({ x, y, width, height, src }: SpriteProps) {
  const container = useCanvasContainer()
  const destroy = useStatic(() => {
    const sprite = _Sprite.from(src)
    sprite.x = x
    sprite.y = y
    sprite.width = width
    sprite.height = height
    container.addChild(sprite)

    return () => {
      sprite?.destroy()
    }
  })
  useEffect(() => destroy, [destroy])
  return null
}

export default memo(Sprite)
