import { memo, useEffect } from 'react'
import { useCanvasApp, useCanvasContainer } from 'components/ui/Canvas/hooks'
import useStatic from 'hooks/useStatic'
import { Container, Graphics, InteractionEvent, Rectangle } from 'pixi.js'
import { between, roundBy } from 'utils/canvas'
import { Viewport } from 'pixi-viewport'

export interface SelectionProps {
  onChange?: (selection: Rectangle) => void
}

type Position = 'tl' | 'tc' | 'tr' | 'cr' | 'br' | 'bc' | 'bl' | 'cl'

function Selection({ onChange }: SelectionProps) {
  const container = useCanvasContainer() as Viewport
  const app = useCanvasApp()
  const unsubscribe = useStatic(() => {
    let x = 10
    let y = 10
    let width = 100
    let height = 30
    let dragging = false
    let resize = false

    const selectionContainer = new Container()
    const selectionArea = new Graphics()
    selectionContainer.addChild(selectionArea)
    const parentScale = container.scale

    selectionArea.buttonMode = true
    selectionArea.interactive = true
    selectionArea
      .on('mousedown', onDragStart)
      .on('touchstart', onDragStart)
      .on('mouseup', onDragEnd)
      .on('mouseupoutside', onDragEnd)
      .on('touchend', onDragEnd)
      .on('touchendoutside', onDragEnd)

    function onDragStart(this: Graphics, e: InteractionEvent) {
      dragging = true
      container.plugins.pause('drag')
      container.on('mousemove', onDragMove).on('touchmove', onDragMove)
    }

    function onDragEnd(this: Graphics) {
      dragging = false
      container.off('mousemove', onDragMove).on('touchmove', onDragMove)
      container.plugins.resume('drag')
      if (onChange) onChange(new Rectangle(roundBy(x), roundBy(y), roundBy(width), roundBy(height)))
    }

    function onDragMove(event: any) {
      if (dragging) {
        event.stopPropagation()
        x = between(x + event.data.originalEvent.movementX / parentScale.x, 0, 1000 - width) // TODO touch event mb have no movementX/Y
        y = between(y + event.data.originalEvent.movementY / parentScale.y, 0, 1000 - height)
      }
    }

    const resizePoints = [
      createResizePoint('tc'),
      createResizePoint('cl'),
      createResizePoint('cr'),
      createResizePoint('bc'),
      createResizePoint('tl'),
      createResizePoint('tr'),
      createResizePoint('bl'),
      createResizePoint('br'),
    ]

    function render() {
      selectionArea.clear()
      const selectionX = roundBy(x)
      const selectionY = roundBy(y)
      const selectionWidth = roundBy(width)
      const selectionHeight = roundBy(height)

      selectionArea.lineStyle(0.9 / parentScale.x, 0x000000, 1, 0)
      selectionArea.beginFill(0xffffff, 0.5)
      selectionArea.drawRect(selectionX, selectionY, selectionWidth, selectionHeight)
      selectionArea.endFill()

      resizePoints.forEach((render) =>
        render(selectionX, selectionY, selectionWidth, selectionHeight)
      )
    }

    container.addChild(selectionContainer)

    app.ticker.add(render)

    return () => {
      app.ticker.remove(render)
      container.off('mousemove', onDragMove).on('touchmove', onDragMove)
      selectionContainer.destroy()
    }

    function createResizePoint(position: Position) {
      const pointRect = new Graphics()
      const [kX, kY, kWidth, kHeight] = getDirection(position)
      const [pX, pY] = getPosition(position)

      pointRect.buttonMode = true
      pointRect.interactive = true
      pointRect
        .on('mousedown', onResizeStart)
        .on('touchstart', onResizeStart)
        .on('mouseup', onResizeEnd)
        .on('mouseupoutside', onResizeEnd)
        .on('touchend', onResizeEnd)
        .on('touchendoutside', onResizeEnd)

      selectionContainer.addChild(pointRect)

      return function (
        parentX: number,
        parentY: number,
        parentWidth: number,
        parentHeight: number
      ) {
        const ds = 10 / parentScale.x
        pointRect.clear()
        pointRect.visible =
          position[0] === 'c' ? height > 10 : position[1] === 'c' ? width > 10 : true
        pointRect.lineStyle(0.9 / parentScale.x, 0x000000, 1, 0)
        pointRect.beginFill(0xffffff)
        pointRect.drawRect(
          parentX + parentWidth * pX - ds / 2,
          parentY + parentHeight * pY - ds / 2,
          ds,
          ds
        )
        pointRect.endFill()
        // pointRect.hitArea = new Rectangle( // mb increase hit area ???
        //   parentX + parentWidth * pX - ds,
        //   parentY + parentHeight * pY - ds,
        //   ds * 2,
        //   ds * 2
        // )
      }

      function onResizeStart(this: Graphics) {
        resize = true
        container.plugins.pause('drag')
        container.on('mousemove', onResizeMove).on('touchmove', onResizeMove)
      }

      function onResizeEnd(this: Graphics) {
        resize = false
        container.off('mousemove', onResizeMove).off('touchmove', onResizeMove)
        container.plugins.resume('drag')
        if (onChange)
          onChange(new Rectangle(roundBy(x), roundBy(y), roundBy(width), roundBy(height)))
      }

      function onResizeMove(event: any) {
        if (resize) {
          event.stopPropagation()
          const dWidth = (event.data.originalEvent.movementX / parentScale.x) * kWidth
          const newWidth = between(width + dWidth, 10, 1000 - x)
          const oldWidth = width
          width = newWidth
          const dx = (roundBy(oldWidth) - roundBy(newWidth)) * kX
          x = between(x + dx, 0, 1000 - width)

          const dHeight = (event.data.originalEvent.movementY / parentScale.y) * kHeight
          const newHeight = between(height + dHeight, 10, 1000 - y)
          const oldHeight = height
          height = newHeight
          const dy = (roundBy(oldHeight) - roundBy(newHeight)) * kY
          y = between(y + dy, 0, 1000 - height)
        }
      }
    }
  })

  useEffect(() => unsubscribe)

  return null
}

function getDirection(position: Position): [number, number, number, number] {
  switch (position) {
    case 'tl':
      return [1, 1, -1, -1]
    case 'tc':
      return [0, 1, 0, -1]
    case 'tr':
      return [0, 1, 1, -1]
    case 'cr':
      return [0, 0, 1, 0]
    case 'br':
      return [0, 0, 1, 1]
    case 'bc':
      return [0, 0, 0, 1]
    case 'bl':
      return [1, 0, -1, 1]
    case 'cl':
      return [1, 0, -1, 0]
  }
}

function getPosition(position: Position): [number, number] {
  switch (position) {
    case 'tl':
      return [0, 0]
    case 'tc':
      return [0.5, 0]
    case 'tr':
      return [1, 0]
    case 'cr':
      return [1, 0.5]
    case 'br':
      return [1, 1]
    case 'bc':
      return [0.5, 1]
    case 'bl':
      return [0, 1]
    case 'cl':
      return [0, 0.5]
  }
}

export default memo(Selection)
