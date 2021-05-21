import { memo, useEffect } from 'react'
import { Graphics } from 'pixi.js'
import { useCanvasApp } from 'components/ui/Canvas/hooks'

export interface SelectionProps {}

function Selection() {
  const app = useCanvasApp()

  useEffect(() => {
    let visible = false
    let vec1 = [0, 0]
    let vec2 = [0, 0]
    let offsetX: number
    let offsetY: number

    const rect = new Graphics()
    rect.visible = visible
    app.stage.addChild(rect)

    function render() {
      app.ticker.addOnce(() => {
        if (!offsetX) offsetX = app.view.offsetLeft
        if (!offsetY) offsetY = app.view.offsetTop

        rect.clear()
        rect.visible = visible
        if (!visible) return
        const x1 = Math.round(Math.min(vec1[0], vec2[0]) / 10) * 10 - offsetX
        const y1 = Math.round(Math.min(vec1[1], vec2[1]) / 10) * 10 - offsetY
        const x2 = Math.round(Math.max(vec1[0], vec2[0]) / 10) * 10 - offsetX
        const y2 = Math.round(Math.max(vec1[1], vec2[1]) / 10) * 10 - offsetY

        rect.beginFill(0xffff00, 0.2)
        rect.lineStyle(1, 0x1c1c1c, 0.5)
        rect.drawRect(x1, y1, x2 - x1, y2 - y1)
      })
    }

    function onMouseDown(e: MouseEvent) {
      vec1 = [e.clientX, e.clientY]
      vec2 = [e.clientX, e.clientY]
      visible = true
      document.documentElement.addEventListener('mousemove', onMouseMove)
    }

    function onMouseMove(e: MouseEvent) {
      vec2 = [e.clientX, e.clientY]
      render()
    }

    function onMouseUp() {
      visible = false
      document.documentElement.removeEventListener('mousemove', onMouseMove)
      render()
    }

    document.documentElement.addEventListener('mousedown', onMouseDown)
    document.documentElement.addEventListener('mouseup', onMouseUp)

    return () => {
      document.documentElement.removeEventListener('mousedown', onMouseDown)
      document.documentElement.removeEventListener('mousemove', onMouseMove)
      document.documentElement.removeEventListener('mouseup', onMouseUp)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default memo(Selection)
