import { CSSProperties, memo, Reducer, useLayoutEffect, useReducer, useRef } from 'react'
import Grid from 'components/Viewport/Grid'
import { ViewportContentSC, ViewportSC } from 'components/Viewport/styled'

export interface ViewportProps {
  className?: string
  style?: CSSProperties
}

interface State {
  scale: number
  origin: [number, number]
}

function Viewport({ className, style }: ViewportProps) {
  const [state, dispatch] = useReducer<Reducer<State, Partial<State>>>(
    (state, action) => {
      return Object.assign({}, state, action)
    },
    { scale: 1, origin: [0, 0] }
  )
  const stateRef = useRef(state)
  stateRef.current = state
  const viewportRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    viewportRef.current!.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault()
        console.log(e)
        const state = stateRef.current
        const delta = e.deltaY * -0.01
        dispatch({
          scale: Math.min(Math.max(1, state.scale + delta), 40),
          origin: [e.offsetX, e.offsetY],
        })
      },
      { passive: false }
    )
  }, [])

  return (
    <ViewportSC className={className} style={style} ref={viewportRef}>
      <ViewportContentSC
        style={{
          transform: `scale(${state.scale})`,
          transformOrigin: `${state.origin[0]}px ${state.origin[1]}px`,
        }}
      >
        <Grid />
      </ViewportContentSC>
    </ViewportSC>
  )
}

export default memo(Viewport)
