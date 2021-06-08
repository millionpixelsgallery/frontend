import { useEffect } from 'react'

type ElementLike = {
  addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void
  removeEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void
}

export function useEventListener<E extends ElementLike, K extends keyof HTMLElementEventMap>(
  element: E,
  type: K,
  listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
  deps: any[] = [],
  options?: boolean | AddEventListenerOptions
) {
  useEffect(() => {
    element.addEventListener(type, listener, options)
    return () => {
      element.removeEventListener(type, listener, options)
    }
  }, [element, type, listener, options, ...deps])
}
