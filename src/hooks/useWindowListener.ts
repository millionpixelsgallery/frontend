import { useCallback, useEffect } from 'react'

export default function useWindowListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | any[] | (AddEventListenerOptions & { deps?: any[] })
) {
  listener = useCallback(
    listener,
    !options || typeof options === 'boolean'
      ? []
      : Array.isArray(options)
      ? options
      : options.deps ?? []
  )
  return useEffect(() => {
    window.addEventListener(type, listener, !Array.isArray(options) ? options : undefined)
    return () => window.removeEventListener(type, listener)
  }, [listener])
}
