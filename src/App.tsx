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
