import {
  createContext,
  HTMLProps,
  memo,
  ReactElement,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import * as PIXI from 'pixi.js'

export interface CanvasProps
  extends Pick<HTMLProps<HTMLCanvasElement>, 'id' | 'className' | 'style'>,
    Pick<PIXI.IApplicationOptions, 'backgroundColor'> {
  children?: ReactElement | ReactElement[]
  width: number
  height: number
}

const PixiApplicationContext = createContext<PIXI.Application | undefined>(undefined)

export function usePixiApp() {
  return useContext(PixiApplicationContext)!
}

function Canvas({ children, width, height, backgroundColor, ...restProps }: CanvasProps) {
  const $wrapper = useRef<HTMLCanvasElement>(null)
  const [app, setApp] = useState<PIXI.Application>()

  useLayoutEffect(() => {
    const app = new PIXI.Application({
      width,
      height,
      view: $wrapper.current!,
      backgroundColor,
      antialias: true,
    })
    setApp(app)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PixiApplicationContext.Provider value={app}>
      <canvas ref={$wrapper} width={width} height={height} {...restProps} />
      {app && children}
    </PixiApplicationContext.Provider>
  )
}

export default memo(Canvas)
