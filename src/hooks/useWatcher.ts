import { useEffect } from 'react'
import useRenderRef from 'hooks/useRenderRef'

/**
 * It's similar to useEffect but useWatcher pass first render and have no clear effect
 * but able to work with async functions
 *
 * @param effect
 * @param deps
 * @param skipRenders
 */
export default function useWatcher(effect: () => any, deps?: any[], skipRenders?: number) {
  const render = useRenderRef(skipRenders)
  useEffect(() => {
    if (render.skipped) return
    effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
