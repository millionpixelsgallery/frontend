import { useGA4React } from 'ga-4-react'
export const useGA4 = () => {
  const ga4 = useGA4React(process.env.REACT_APP_GA4_KEY)
  return ga4
}
