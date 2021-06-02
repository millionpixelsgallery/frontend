import { useRef } from 'react'

export default function useLink<T>(value: T) {
  const ref = useRef<T>(value)
  ref.current = value
  return ref
}
