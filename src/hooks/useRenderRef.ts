import { useRef } from 'react'
import useStatic from 'hooks/useStatic'

export default function useRenderRef(ticks: number = 1) {
  const firstRenderRef = useRef(true)
  const renderAmountRef = useRef(-Math.abs(ticks))

  return useStatic(() => ({
    ref: renderAmountRef,
    get first() {
      const result = firstRenderRef.current
      if (firstRenderRef.current) {
        firstRenderRef.current = false
      }
      return result
    },
    get skipped() {
      return renderAmountRef.current++ < 0
    },
  }))
}
