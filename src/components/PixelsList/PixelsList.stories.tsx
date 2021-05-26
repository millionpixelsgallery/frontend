import PixelsList from './index'
import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

const PixelsListStory = {
  title: 'PixelsList',
  component: PixelsList,
}

export default PixelsListStory

function createStory(args: ComponentProps<typeof PixelsList>) {
  const template: Story<ComponentProps<typeof PixelsList>> = (args) => <PixelsList {...args} />
  template.args = args
  return template
}

const getUnixTimestamp = () => {
  return '' + (Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 50000))
}

export const Default = createStory({
  data: Array.from({ length: Math.floor(Math.random() * 6) }).map(() => ({
    width: Math.floor(Math.random() * 200),
    height: Math.floor(Math.random() * 200),
    position: {
      x: Math.floor(Math.random() * 200),
      y: Math.floor(Math.random() * 200),
    },
    saleUntil: Math.random() > 0.5 ? getUnixTimestamp() : undefined,
    image: 'http://random.image',
    link: 'https://try.this.link.to.test.pixels.list',
  })),
})
