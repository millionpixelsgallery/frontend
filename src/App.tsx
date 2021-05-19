import Canvas from 'components/ui/Canvas'
import Grid from 'components/ui/Canvas/Grid'

function App() {
  return (
    <Canvas width={1001} height={1001} backgroundColor={0xf8f8f8}>
      <Grid gap={10} color={0xececec} />
    </Canvas>
  )
}

export default App
