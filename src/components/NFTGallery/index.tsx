import { memo, useCallback, useState } from 'react'
import { NFTGallerySC, NFTGallerySCProps } from './styled'
import Viewport from 'components/ui/Canvas/Viewport'
import Rectangle from 'components/ui/Canvas/Rectangle'
import Grid from 'components/ui/Canvas/Grid'
import Selection from 'components/ui/Canvas/Selection'
import Sprite from 'components/ui/Canvas/Sprite'
import Container from 'components/ui/Canvas/Container'

export interface NFTGalleryProps extends NFTGallerySCProps {}

const options = { backgroundColor: 0xf8f8f8 }

function NFTGallery(props: NFTGalleryProps) {
  const [gridVisible, setGridVisible] = useState(false)
  const handleZoom = useCallback((e) => setGridVisible(e.viewport.scaled >= 4), [])

  return (
    <NFTGallerySC width={1000} height={1000} options={options}>
      <Viewport onZoomed={handleZoom}>
        <Rectangle x={300} y={300} width={400} height={400} color={0xeaeaea} />
        <Rectangle x={450} y={450} width={100} height={100} color={0xdddddd} />
        <Container>
          {Array.from({ length: 20 }).map((_, i) =>
            Array.from({ length: 20 }).map((_, j) => {
              return (
                <Sprite
                  key={`${i}${j}`}
                  x={i * 40 + 1}
                  y={j * 40 + 1}
                  width={38}
                  height={38}
                  src={`https://loremflickr.com/38/38?t=${i}${j}`}
                />
              )
            })
          )}
        </Container>
        <Grid
          gap={1}
          lineWidth={0.1}
          color={0xececec}
          width={1000}
          height={1000}
          hidden={!gridVisible}
        />
        <Selection onChange={console.log} />
      </Viewport>
    </NFTGallerySC>
  )
}

export default memo(NFTGallery)
