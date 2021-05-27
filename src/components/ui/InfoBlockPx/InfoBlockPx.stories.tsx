import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import InfoBlockPx from './index'

const InfoBlockPxStory = {
  title: 'InfoBlockPx',
  component: InfoBlockPx,
}

export default InfoBlockPxStory

function createStory(args: ComponentProps<typeof InfoBlockPx>) {
  const template: Story<ComponentProps<typeof InfoBlockPx>> = (args) => <InfoBlockPx {...args} />
  template.args = args
  return template
}

export const Default = createStory({})
