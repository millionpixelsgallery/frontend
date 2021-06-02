import Layout from 'components/Layout'
import Viewport from 'components/Viewport'
import { Web3Connect, Web3Methods } from 'lib/web3connect'
import { useEffect, useState } from 'react'
import { ApiContext } from 'hooks/useApi'

function App() {
  const [methods, setMethods] = useState<Web3Methods>()
  useEffect(() => {
    if (Web3Connect.cachedProvider) {
      new Web3Connect(setMethods).connect()
    }
  }, [])

  return (
    <ApiContext.Provider
      value={{
        methods,
        async connect(provider) {
          await new Web3Connect(setMethods).connect(provider)
        },
      }}
    >
      <Layout>
        <Viewport />
      </Layout>
    </ApiContext.Provider>
  )
}

export default App
