import {
  createContext,
  ReactNode,
  ReactNodeArray,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { Pixels, Web3Connect } from 'lib/web3connect'
import { useApiMethods } from 'hooks/useApi'
import { getLocalCache, setLocalCache } from 'utils/cache'
import { uniqBy } from 'lodash'

interface IPixelsContext extends PixelsState {
  setSelectionActive(value?: boolean): void
  fetchPixels(refreshIndex?: number): Promise<void>
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
  | Action<'PIXELS_LOADING'>
  | Action<'PIXELS_CHANGE', { pixels: Pixels[] }>
  | Action<'MY_PIXELS_LOADING'>
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
            myPixels: action.pixels.filter((_) => _.owner === methods?.getAccount()),
            pixelsLoading: false,
          }
        case 'PIXELS_LOADING':
          return {
            ...state,
            pixelsLoading: true,
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
            myPixelsLoading: true,
          }
        default:
          return state
      }
    },
    {
      selectionActive: false,
      pixels: getLocalCache('pixels', [] as Array<Pixels>),
      pixelsLoading: false,
      myPixelsLoading: false,
      myPixels: getLocalCache('pixels', [] as Array<Pixels>).filter(
        (_) => _.owner === methods?.getAccount()
      ),
    }
  )

  // const fetchMyPixels = useCallback(async () => {
  //   if (!methods) return
  //   dispatch({
  //     type: 'MY_PIXELS_LOADING',
  //   })
  //   const pixels = await methods.getAllMyPixels().catch((e) => {
  //     console.error(e)
  //     return []
  //   })
  //   dispatch({
  //     type: 'MY_PIXELS_CHANGE',
  //     pixels,
  //   })
  // }, [methods])

  const fetchPixels = useCallback(async (refreshIndex?: number | undefined) => {
    dispatch({
      type: 'PIXELS_LOADING',
    })
    //remove the item we want to refresh
    const cached = (state.pixels || []).filter((_) => _.index != refreshIndex)

    let pixels = await Web3Connect.getAllPixels(cached).catch((e) => {
      console.error(e)
      return [] as Pixels[]
    })
    pixels = uniqBy(pixels.concat(cached), 'index') //use the latest fetched
    setLocalCache('pixels', pixels)
    dispatch({
      type: 'PIXELS_CHANGE',
      pixels,
    })
  }, [])

  useEffect(() => {
    fetchPixels()
  }, [])

  useEffect(() => {
    if (methods && state.pixels) {
      dispatch({
        type: 'MY_PIXELS_CHANGE',
        pixels: state.pixels.filter((_) => _.owner === methods.getAccount()),
      })
    }
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
        fetchPixels,
      }}
    >
      {children}
    </PixelsContext.Provider>
  )
}

export function usePixelsController() {
  return useContext(PixelsContext)
}
