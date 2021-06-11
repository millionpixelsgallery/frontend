import { createContext, useContext } from 'react'
import { Web3Methods, Web3Providers } from 'lib/web3connect'

interface IApiContext {
  methods?: Web3Methods
  loading?: boolean
  connect(provider: Web3Providers): Promise<Web3Methods | undefined>
}

export const ApiContext = createContext<IApiContext>({
  connect() {
    return Promise.resolve(undefined)
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
