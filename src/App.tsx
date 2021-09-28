import Layout from 'components/Layout'
import Viewport from 'components/Viewport'
import { Web3Connect, Web3Methods } from 'lib/web3connect'
import { useEffect, useState } from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom'
import { ApiContext } from 'hooks/useApi'
import Modal from 'components/ui/Modal'
import MobilePlaceholder from 'components/MobilePlaceholder'
import MyPixels from 'components/MyPixels'
import { PixelsProvider } from 'hooks/usePixels'
import { useGA4 } from 'lib/ga4'

function App() {
  const [loading, setLoading] = useState(Boolean(Web3Connect.cachedProvider))
  const [methods, setMethods] = useState<Web3Methods>()
  const routerLocation = useLocation()

  const ga4 = useGA4()

  useEffect(() => {
    if (ga4) {
      ga4.pageview(routerLocation.pathname)
    }
  }, [ga4, routerLocation])

  useEffect(() => {
    ;(async () => {
      if (Web3Connect.cachedProvider) {
        try {
          await new Web3Connect(setMethods).connect()
        } catch (e) {
          console.error(e)
        } finally {
          setLoading(false)
        }
      }
    })()
  }, [])

  return (
    <ApiContext.Provider
      value={{
        loading,
        methods,
        async connect(provider) {
          try {
            setLoading(true)
            return await new Web3Connect(setMethods).connect(provider)
          } catch (e) {
            throw e
          } finally {
            setLoading(false)
          }
        },
      }}
    >
      <PixelsProvider>
        <Modal
          closable={false}
          component={MobilePlaceholder}
          defaultVisible={window.innerWidth < 1281}
        />
        <Layout>
          <Switch>
            <Route path='/gallery/:selectedPixel?'>
              <Viewport key='gallery' />
            </Route>
            <Route path='/buy'>
              <Viewport key='gallery' />
            </Route>
            <Route path='/my-pixels' component={MyPixels} />
            <Route path='/marketplace'>
              <Viewport key='marketplace' sellMode />
            </Route>
            <Redirect to='/gallery' from='/' exact />
          </Switch>
        </Layout>
      </PixelsProvider>
    </ApiContext.Provider>
  )
}

export default App
