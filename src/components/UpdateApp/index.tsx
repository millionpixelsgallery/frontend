import React, { FC, useEffect } from 'react'
import { Snackbar, SnackbarContent } from '@material-ui/core'
import * as serviceWorker from '../../serviceWorkerRegistration'
import Button from 'components/ui/Button'
import Text from 'components/ui/Text'
const UpdateApp: FC = () => {
  const [showReload, setShowReload] = React.useState(false)
  const [waitingWorker, setWaitingWorker] = React.useState<ServiceWorker | null>(null)

  const onSWUpdate = (registration: ServiceWorkerRegistration) => {
    setShowReload(true)
    setWaitingWorker(registration.waiting)
  }

  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate })
  }, [])

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' })
    setShowReload(false)
    window.location.reload()
  }

  return (
    <Snackbar
      open={showReload}
      message='A new version is available!'
      onClick={reloadPage}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <SnackbarContent
        style={{
          backgroundColor: 'transparent',
          color: 'black',
        }}
        message={<Text>A new version is available!</Text>}
        action={
          <Button color='inherit' onClick={reloadPage}>
            Reload
          </Button>
        }
      />
    </Snackbar>
  )
}

export default UpdateApp
