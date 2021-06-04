import Layout from 'components/Layout'
import Viewport from 'components/Viewport'
import { Web3Connect, Web3Methods } from 'lib/web3connect'
import { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ApiContext } from 'hooks/useApi'
import Modal from 'components/ui/Modal'
import MobilePlaceholder from 'components/MobilePlaceholder'
import MyPixels from 'components/MyPixels'

function App() {
  const [loading, setLoading] = useState(true)
  const [methods, setMethods] = useState<Web3Methods>()
  useEffect(() => {
    ;(async () => {
      if (Web3Connect.cachedProvider) {
        try {
          await new Web3Connect(setMethods).connect()
        } catch (e) {
          console.error(e)
        }
      }
      setLoading(false)
    })()
  }, [])

  return (
    <ApiContext.Provider
      value={{
        loading,
        methods,
        async connect(provider) {
          setLoading(true)
          try {
            await new Web3Connect(setMethods).connect(provider)
          } catch (e) {
            console.error(e)
          }
          setLoading(false)
        },
      }}
    >
      <Modal
        closable={false}
        component={MobilePlaceholder}
        defaultVisible={window.innerWidth < 1281}
      />
      <Layout>
        <Switch>
          <Route path='/gallery' component={Viewport} />
          <Route path='/my-pixels' component={MyPixels} />
          <Route path='/marketplace' />
          <Redirect to='/gallery' from='/' exact />
        </Switch>
      </Layout>
    </ApiContext.Provider>
  )
}

export default App
