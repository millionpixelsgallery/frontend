import { createContext, ReactNode, ReactNodeArray, useContext, useReducer } from 'react'
import { Pixels, Web3Connect } from 'lib/web3connect'

interface IPixelsContext extends PixelsState {
  setSelectionActive(value?: boolean): void
  fetchPixels(): Promise<void>
}

type Action<N extends string, T extends object = never> = [T] extends [never]
  ? { type: N }
  : { type: N } & T

interface PixelsState {
  selectionActive: boolean
  pixels: Pixels[] | undefined
  pixelsLoading: boolean
}

type PixelsActions =
  | Action<'SELECTION_ACTIVE_CHANGE', { value?: boolean }>
  | Action<'PIXELS_LOADING', { loading: boolean }>
  | Action<'PIXELS_CHANGE', { pixels: Pixels[] }>

const PixelsContext = createContext<IPixelsContext>({} as IPixelsContext)

export function PixelsProvider({ children }: { children?: ReactNode | ReactNodeArray }) {
  const [state, dispatch] = useReducer(
    (state: PixelsState, action: PixelsActions): PixelsState => {
      switch (action.type) {
        case 'SELECTION_ACTIVE_CHANGE':
          return {
            ...state,
            selectionActive: action.value ?? !state.selectionActive,
          }
        case 'PIXELS_CHANGE':
          return {
            ...state,
            pixels: action.pixels,
            pixelsLoading: false,
          }
        case 'PIXELS_LOADING':
          return {
            ...state,
            pixelsLoading: action.loading,
          }
        default:
          return state
      }
    },
    { selectionActive: false, pixels: undefined, pixelsLoading: false }
  )

  return (
    <PixelsContext.Provider
      value={{
        ...state,
        setSelectionActive(value?: boolean) {
          dispatch({
            type: 'SELECTION_ACTIVE_CHANGE',
            value,
          })
        },
        async fetchPixels() {
          dispatch({
            type: 'PIXELS_LOADING',
            loading: true,
          })
          const pixels = await Web3Connect.getAllPixels().catch((e) => {
            console.error(e)
            return []
          })
          dispatch({
            type: 'PIXELS_CHANGE',
            pixels,
          })
        },
      }}
    >
      {children}
    </PixelsContext.Provider>
  )
}

export function usePixelsController() {
  return useContext(PixelsContext)
}
