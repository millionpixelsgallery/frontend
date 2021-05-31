import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import InfoBlock from './index'

const InfoBlockStory = {
  title: 'InfoBlock',
  component: InfoBlock,
}

export default InfoBlockStory

function createStory(args: ComponentProps<typeof InfoBlock>) {
  const template: Story<ComponentProps<typeof InfoBlock>> = (args) => <InfoBlock {...args} />
  template.args = args
  return template
}

export const Default = createStory({})
