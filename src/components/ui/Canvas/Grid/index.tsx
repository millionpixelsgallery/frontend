import { usePixiApp } from 'components/ui/Canvas/index'
import { Graphics } from 'pixi.js'
import { memo } from 'react'

export interface GridProps {
  gap: number
  width?: number
  color?: number
}

function Grid({ gap, color = 0x000000, width: lineWidth = 1 }: GridProps) {
  const app = usePixiApp()
  const dx = app.renderer.height
  const dy = app.renderer.width

  for (let i = lineWidth / 2; i <= dx; i += gap) {
    const line = new Graphics()
    line.lineStyle(lineWidth, color)
    line.moveTo(0, i)
    line.lineTo(dy, i)
    app.viewport.addChild(line)
  }

  for (let i = lineWidth / 2; i <= dy; i += gap) {
    const line = new Graphics()
    line.lineStyle(lineWidth, color)
    line.moveTo(i, 0)
    line.lineTo(i, dx)
    app.viewport.addChild(line)
  }

  return null
}

export default memo(Grid)
