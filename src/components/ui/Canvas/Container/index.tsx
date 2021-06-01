import { memo, ReactNode, ReactNodeArray, useEffect } from 'react'
import { CanvasContainerContext, useCanvasContainer } from 'components/ui/Canvas/hooks'
import useStatic from 'hooks/useStatic'
import { Container as _Container } from 'pixi.js'

export interface ContainerProps {
  children?: ReactNode | ReactNodeArray
}

function Container({ children }: ContainerProps) {
  const parentContainer = useCanvasContainer()
  const [container, destroy] = useStatic(() => {
    const container = new _Container()
    parentContainer.addChild(container)
    return [
      container,
      () => {
        container.destroy()
      },
    ] as const
  })
  useEffect(() => destroy, [destroy])
  return (
    <CanvasContainerContext.Provider value={container}>{children}</CanvasContainerContext.Provider>
  )
}

export default memo(Container)
