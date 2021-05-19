import { useCallback, useState } from 'react'

/**
 * like useState but only for boolean type
 * has predefined toggle func
 *
 * @param initialValue
 */
export default function useTrigger(initialValue: boolean) {
  const [value, setValue] = useState(initialValue)
  const toggle = useCallback(() => setValue((value) => !value), [])
  return [value, toggle, setValue] as const
}
