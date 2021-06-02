import PixelsList from './index'
import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'
import { pixelsListMockedData } from 'components/PixelsList/mockedData'

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

export const Default = createStory({
  data: pixelsListMockedData,
})
