import { useEffect, useState } from 'react'

export const usePageLoaded = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    window.onload = () => setLoaded(true)
  }, [])
  return loaded
}
