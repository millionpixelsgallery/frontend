import { useMemo } from 'react'

/**
 * Always returns value of first render(initial)
 * if function provided, returns result of function
 *
 * @param value
 */
export default function useStatic<T>(value: T): T extends () => infer R ? R : T {
  // eslint-disable-next-line
  return useMemo(() => (typeof value === 'function' ? value() : value), [])
}
