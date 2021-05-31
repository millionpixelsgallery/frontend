import { memo, useEffect } from 'react'
import { useCanvasApp, useCanvasContainer } from 'components/ui/Canvas/hooks'
import useStatic from 'hooks/useStatic'
import { Container, Graphics, Rectangle, InteractionEvent } from 'pixi.js'
import { between, roundBy } from 'utils/canvas'
import { Viewport } from 'pixi-viewport'

export interface SelectionProps {
  onChange?: (selection: Rectangle) => void
}

type Position = 'tl' | 'tc' | 'tr' | 'cr' | 'br' | 'bc' | 'bl' | 'cl'

function Selection({ onChange }: SelectionProps) {
  const container = useCanvasContainer() as Viewport
  const app = useCanvasApp()
  const destroy = useStatic(() => {
    let x1 = 10
    let y1 = 10
    let x2 = x1 + 100
    let y2 = y1 + 30
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
      e.data.originalEvent.preventDefault()
      dragging = true
      x1 = roundBy(x1)
      y1 = roundBy(y1)
      x2 = roundBy(x2)
      y2 = roundBy(y2)
      container.plugins.pause('drag')
      container.on('mousemove', onDragMove).on('touchmove', onDragMove)
    }

    function onDragEnd(this: Graphics) {
      dragging = false
      container.off('mousemove', onDragMove).on('touchmove', onDragMove)
      container.plugins.resume('drag')
      if (onChange) {
        const _x1 = roundBy(x1)
        const _y1 = roundBy(y1)
        const _x2 = roundBy(x2)
        const _y2 = roundBy(y2)
        onChange(new Rectangle(_x1, _y1, _x2 - _x1, _y2 - _y1))
      }
    }

    function onDragMove(event: any) {
      if (dragging) {
        event.stopPropagation()
        const dx = event.data.originalEvent.movementX / parentScale.x
        const dy = event.data.originalEvent.movementY / parentScale.y

        if (dx < 0) {
          const _x1 = between(x1 + dx, 0)
          x2 += _x1 - x1
          x1 = _x1
        } else if (dx > 0) {
          const _x2 = between(x2 + dx, undefined, 1000)
          x1 += _x2 - x2
          x2 = _x2
        }

        if (dy < 0) {
          const _y1 = between(y1 + dy, 0)
          y2 += _y1 - y1
          y1 = _y1
        } else if (dy > 0) {
          const _y2 = between(y2 + dy, undefined, 1000)
          y1 += _y2 - y2
          y2 = _y2
        }
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
      const _x1 = roundBy(x1)
      const _y1 = roundBy(y1)
      const _x2 = roundBy(x2)
      const _y2 = roundBy(y2)

      selectionArea.lineStyle(1 / parentScale.x, 0x000000, 1, 0)
      selectionArea.beginFill(0xffffff, 0.5)
      selectionArea.moveTo(_x1, _y1)
      selectionArea.lineTo(_x2, _y1)
      selectionArea.lineTo(_x2, _y2)
      selectionArea.lineTo(_x1, _y2)
      selectionArea.lineTo(_x1, _y1)
      selectionArea.endFill()

      resizePoints.forEach((render) => render(_x1, _y1, _x2 - _x1, _y2 - _y1))
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
      const [kx1, ky1, kx2, ky2] = getPointsImpact(position)
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
          position[0] === 'c' ? parentHeight > 10 : position[1] === 'c' ? parentWidth > 10 : true
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

      function onResizeStart(this: Graphics, e: InteractionEvent) {
        e.data.originalEvent.preventDefault()
        resize = true
        container.plugins.pause('drag')
        container.on('mousemove', onResizeMove).on('touchmove', onResizeMove)
      }

      function onResizeEnd(this: Graphics) {
        resize = false
        container.off('mousemove', onResizeMove).off('touchmove', onResizeMove)
        container.plugins.resume('drag')
        if (onChange) {
          const _x1 = roundBy(x1)
          const _y1 = roundBy(y1)
          const _x2 = roundBy(x2)
          const _y2 = roundBy(y2)
          onChange(new Rectangle(_x1, _y1, _x2 - _x1, _y2 - _y1))
        }
      }

      function onResizeMove(event: any) {
        if (resize) {
          event.stopPropagation()
          const dx = event.data.originalEvent.movementX / parentScale.x
          const dy = event.data.originalEvent.movementY / parentScale.y
          const _x1 = between(x1 + dx * kx1, 0, 999)
          const _y1 = between(y1 + dy * ky1, 0, 999)
          const _x2 = between(x2 + dx * kx2, 1, 1000)
          const _y2 = between(y2 + dy * ky2, 1, 1000)
          if (_x2 - _x1 >= 1) {
            x1 = _x1
            x2 = _x2
          }
          if (_y2 - _y1 >= 1) {
            y1 = _y1
            y2 = _y2
          }
        }
      }
    }
  })

  useEffect(() => destroy, [destroy])

  return null
}

function getPointsImpact(position: Position): [number, number, number, number] {
  switch (position) {
    case 'tl':
      return [1, 1, 0, 0]
    case 'tc':
      return [0, 1, 0, 0]
    case 'tr':
      return [0, 1, 1, 0]
    case 'cr':
      return [0, 0, 1, 0]
    case 'br':
      return [0, 0, 1, 1]
    case 'bc':
      return [0, 0, 0, 1]
    case 'bl':
      return [1, 0, 0, 1]
    case 'cl':
      return [1, 0, 0, 0]
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
