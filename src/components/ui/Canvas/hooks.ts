import { Application, Container, Renderer } from 'pixi.js'
import { createContext, useContext } from 'react'

export const CanvasAppContext = createContext<Application | undefined>(undefined)
export const CanvasContainerContext = createContext<Container | undefined>(undefined)
export const CanvasRendererContext = createContext<Renderer | undefined>(undefined)

export function useCanvasApp(): Application {
  return useContext(CanvasAppContext)!
}

export function useCanvasContainer(): Container {
  return useContext(CanvasContainerContext)!
}

export function useCanvasRenderer(): Renderer {
  return useContext(CanvasRendererContext)!
}
