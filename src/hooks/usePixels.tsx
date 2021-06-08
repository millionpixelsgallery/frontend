import {
  createContext,
  ReactNode,
  ReactNodeArray,
  useCallback,
  useContext,
  useReducer,
} from 'react'
import { Pixels, Web3Connect } from 'lib/web3connect'
import { useApiMethods } from 'hooks/useApi'

interface IPixelsContext extends PixelsState {
  setSelectionActive(value?: boolean): void
  fetchPixels(): Promise<void>
  fetchMyPixels(): Promise<void>
}

type Action<N extends string, T extends object = never> = [T] extends [never]
  ? { type: N }
  : { type: N } & T

interface PixelsState {
  selectionActive: boolean

  pixels: Pixels[] | undefined
  pixelsLoading: boolean

  myPixels: Pixels[] | undefined
  myPixelsLoading: boolean
}

type PixelsActions =
  | Action<'SELECTION_ACTIVE_CHANGE', { value?: boolean }>
  | Action<'PIXELS_LOADING', { loading: boolean }>
  | Action<'PIXELS_CHANGE', { pixels: Pixels[] }>
  | Action<'MY_PIXELS_LOADING', { loading: boolean }>
  | Action<'MY_PIXELS_CHANGE', { pixels: Pixels[] }>

const PixelsContext = createContext<IPixelsContext>({} as IPixelsContext)

export function PixelsProvider({ children }: { children?: ReactNode | ReactNodeArray }) {
  const methods = useApiMethods()
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
        case 'MY_PIXELS_CHANGE':
          return {
            ...state,
            myPixels: action.pixels,
            myPixelsLoading: false,
          }
        case 'MY_PIXELS_LOADING':
          return {
            ...state,
            myPixelsLoading: action.loading,
          }
        default:
          return state
      }
    },
    {
      selectionActive: false,
      pixels: undefined,
      pixelsLoading: false,
      myPixelsLoading: false,
      myPixels: undefined,
    }
  )

  const fetchMyPixels = useCallback(async () => {
    if (!methods) return
    dispatch({
      type: 'MY_PIXELS_LOADING',
      loading: true,
    })
    const pixels = await methods.getAllMyPixels().catch((e) => {
      console.error(e)
      return []
    })
    dispatch({
      type: 'MY_PIXELS_CHANGE',
      pixels,
    })
  }, [methods])

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
          if (state.myPixels) fetchMyPixels()
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
        fetchMyPixels,
      }}
    >
      {children}
    </PixelsContext.Provider>
  )
}

export function usePixelsController() {
  return useContext(PixelsContext)
}
