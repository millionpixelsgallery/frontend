import { createContext, useContext } from 'react'
import { Web3Methods, Web3Providers } from 'lib/web3connect'

interface IApiContext {
  methods?: Web3Methods
  loading?: boolean
  connect(provider: Web3Providers): Promise<void>
}

export const ApiContext = createContext<IApiContext>({
  connect() {
    return Promise.resolve()
  },
})

export function useApi() {
  return useContext(ApiContext)
}

export function useApiMethods() {
  return useContext(ApiContext).methods
}

export function useApiConnect() {
  return useContext(ApiContext).connect
}
