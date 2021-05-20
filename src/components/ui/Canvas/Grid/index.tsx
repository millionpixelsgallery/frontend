import { Container, Graphics } from 'pixi.js'
import { memo, useMemo } from 'react'
import { useCanvasContainer } from 'components/ui/Canvas/hooks'
import useStatic from 'hooks/useStatic'

export interface GridProps {
  gap: number | [xGap: number, yGap: number]
  width: number
  height: number
  lineWidth?: number
  color?: number
  hidden?: boolean
}

function Grid({ gap, color = 0x000000, lineWidth = 1, width, height, hidden }: GridProps) {
  const parentContainer = useCanvasContainer()
  const container = useStatic(() => new Container())
  container.visible = !hidden

  useMemo(() => {
    container.removeChildren()
    const [xGap, yGap] = typeof gap === 'number' ? [gap, gap] : gap

    for (let i = 0; i <= height; i += yGap) {
      const line = new Graphics()
      line.lineStyle(lineWidth, color)
      line.moveTo(0, i)
      line.lineTo(width, i)
      container.addChild(line)
    }

    for (let i = 0; i <= width; i += xGap) {
      const line = new Graphics()
      line.lineStyle(lineWidth, color)
      line.moveTo(i, 0)
      line.lineTo(i, height)
      container.addChild(line)
    }
  }, [color, container, gap, height, lineWidth, width])

  useStatic(() => {
    parentContainer.addChild(container)
  })

  return null
}

export default memo(Grid)
