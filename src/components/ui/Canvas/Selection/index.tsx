import { memo, useEffect } from 'react'
import { useCanvasApp, useCanvasContainer } from 'components/ui/Canvas/hooks'
import useStatic from 'hooks/useStatic'
import { Container, Graphics, InteractionEvent, Rectangle } from 'pixi.js'
import { between, roundBy } from 'utils/canvas'
import { Viewport } from 'pixi-viewport'

export interface SelectionProps {}

function Selection() {
  const container = useCanvasContainer() as Viewport
  const app = useCanvasApp()
  const unsubscribe = useStatic(() => {
    const selection = new Container()
    const rect = new Graphics()
    selection.addChild(rect)
    let x = 10
    let y = 10
    let width = 100
    let height = 100
    let dragging = false
    let resize = false
    const scale = container.scale

    rect.buttonMode = true
    rect.interactive = true
    rect
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
    }

    function onDragMove(event: any) {
      if (dragging) {
        event.stopPropagation()
        x = between(x + event.data.originalEvent.movementX / scale.x, 0, 1000 - width) // TODO touch event mb have no movementX/Y
        y = between(y + event.data.originalEvent.movementY / scale.y, 0, 1000 - height)
      }
    }

    const points = [
      createResizePoint('tc'),
      createResizePoint('cr'),
      createResizePoint('cl'),
      createResizePoint('bc'),
      createResizePoint('tl'),
      createResizePoint('tr'),
      createResizePoint('bl'),
      createResizePoint('br'),
    ]

    function createResizePoint(position: 'tl' | 'tc' | 'tr' | 'cr' | 'br' | 'bc' | 'bl' | 'cl') {
      const pointRect = new Graphics()
      const [kX, kY, kWidth, kHeight] = getBounds()
      const [pX, pY] = getPosition()

      pointRect.buttonMode = true
      pointRect.interactive = true
      pointRect
        .on('mousedown', onResizeStart)
        .on('touchstart', onResizeStart)
        .on('mouseup', onResizeEnd)
        .on('mouseupoutside', onResizeEnd)
        .on('touchend', onResizeEnd)
        .on('touchendoutside', onResizeEnd)

      selection.addChild(pointRect)

      return function (
        parentX: number,
        parentY: number,
        parentWidth: number,
        parentHeight: number
      ) {
        const ds = 10 / scale.x
        pointRect.clear()
        pointRect.lineStyle(0.9 / scale.x, 0x000000, 1, 0)
        pointRect.beginFill(0xffffff)
        pointRect.drawRect(
          parentX + parentWidth * pX - ds / 2,
          parentY + parentHeight * pY - ds / 2,
          ds,
          ds
        )
        pointRect.endFill()
        pointRect.hitArea = new Rectangle(
          parentX + parentWidth * pX - ds,
          parentY + parentHeight * pY - ds,
          ds * 2,
          ds * 2
        )
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
      }

      function onResizeMove(event: any) {
        if (resize) {
          event.stopPropagation()
          const dWidth = (event.data.originalEvent.movementX / scale.x) * kWidth
          const newWidth = between(width + dWidth, 10, 1000 - x)
          const oldWidth = width
          width = newWidth
          const dx = (roundBy(oldWidth) - roundBy(newWidth)) * kX
          x = between(x + dx, 0, 1000 - width)

          const dHeight = (event.data.originalEvent.movementY / scale.y) * kHeight
          const newHeight = between(height + dHeight, 10, 1000 - y)
          const oldHeight = height
          height = newHeight
          const dy = (roundBy(oldHeight) - roundBy(newHeight)) * kY
          y = between(y + dy, 0, 1000 - height)
        }
      }

      function getBounds(): [number, number, number, number] {
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

      function getPosition(): [number, number] {
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
    }

    function render() {
      const selectionX = roundBy(x)
      const selectionY = roundBy(y)
      const selectionWidth = roundBy(width)
      const selectionHeight = roundBy(height)

      rect.lineStyle(0.9 / scale.x, 0x000000, 1, 0)
      rect.beginFill(0xffffff, 0.5)
      rect.drawRect(selectionX, selectionY, selectionWidth, selectionHeight)
      rect.endFill()

      points.forEach((render) => render(selectionX, selectionY, selectionWidth, selectionHeight))
    }

    function update() {
      rect.clear()
      render()
    }

    container.addChild(selection)

    app.ticker.add(update)

    return () => {
      app.ticker.remove(update)
      container.off('mousemove', onDragMove).on('touchmove', onDragMove)
      selection.destroy()
    }
  })

  useEffect(() => unsubscribe)

  return null
}

export default memo(Selection)
