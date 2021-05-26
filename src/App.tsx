import Canvas from 'components/ui/Canvas'
import Grid from 'components/ui/Canvas/Grid'
import Viewport from 'components/ui/Canvas/Viewport'
import { useCallback, useState } from 'react'
import Rectangle from 'components/ui/Canvas/Rectangle'
import useStatic from 'hooks/useStatic'
import Selection from 'components/ui/Canvas/Selection'

function App() {
  const [gridVisible, setGridVisible] = useState(false)
  return (
    <Canvas width={1000} height={1000} options={useStatic({ backgroundColor: 0xf8f8f8 })}>
      <Viewport onZoomed={useCallback((e) => setGridVisible(e.viewport.scaled >= 4), [])}>
        <Rectangle x={300} y={300} width={400} height={400} color={0xeaeaea} />
        <Rectangle x={450} y={450} width={100} height={100} color={0xdddddd} />
        <Grid
          gap={1}
          lineWidth={0.1}
          color={0xececec}
          width={1000}
          height={1000}
          hidden={!gridVisible}
        />
        <Selection />
      </Viewport>
    </Canvas>
  )
}

export default App
