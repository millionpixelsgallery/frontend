import { CSSProperties, memo, useEffect, useState } from 'react'
import { SideBarSC, SideBarSCProps } from './styled'
import { Col, Row } from 'components/ui/Grid'
import { margin, marginRight, marginTop } from 'utils/style/indents'
import InfoBlock from 'components/ui/InfoBlock'
import InfoBlockPx from 'components/ui/InfoBlockPx'
import { usePixelsController } from 'hooks/usePixels'
import { getLocalCache, setLocalCache } from 'utils/cache'

export interface SideBarProps extends SideBarSCProps {
  className?: string
  style?: CSSProperties
}

const numberFormat = new Intl.NumberFormat('en')
const format = numberFormat.format.bind(numberFormat)

function SideBar({ className, style, ...rest }: SideBarProps) {
  const { pixels } = usePixelsController()
  const [created, setCreated] = useState<number>(getLocalCache('crated_nft', 0))
  const [sold, setSold] = useState<number>(getLocalCache('sold_pixels', 0))

  useEffect(() => {
    if (!pixels) return
    const created = pixels?.length || 0
    const sold =
      pixels?.reduce((sum, { area: [, , width, height] }) => {
        return sum + width * height
      }, 0) || 0

    setCreated(created)
    setSold(sold)

    setLocalCache('crated_nft', created)
    setLocalCache('sold_pixels', sold)
  }, [pixels])

  return (
    <SideBarSC className={className} style={style} {...rest}>
      <Col style={margin(135, 0, 0, 50)}>
        <InfoBlock title='PIXELS SOLD'>{format(sold)}</InfoBlock>
        <InfoBlock title='NFT CREATED' style={marginTop(50)}>
          {format(created)}
        </InfoBlock>
        <Row style={marginTop(104)}>
          <InfoBlockPx title='1px' children='0.0005' style={marginRight(15)} />
          <img src='/assets/Component3.svg' alt='pixel price zone 1' />
        </Row>
        <Row style={margin(26, 0, 24, 0)}>
          <InfoBlockPx title='1px' children='0.01' style={marginRight(15)} />
          <img src='/assets/Component4.svg' alt='pixel price zone 2' />
        </Row>
        <Row>
          <InfoBlockPx title='1px' children='0.1' style={marginRight(15)} />
          <img src='/assets/Component5.svg' alt='pixel price zone 3' />
        </Row>
      </Col>
    </SideBarSC>
  )
}

export default memo(SideBar)
