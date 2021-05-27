import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import Area from './index'

const AreaStory = {
  title: 'Area',
  component: Area,
}

export default AreaStory

function createStory(args: ComponentProps<typeof Area>) {
  const template: Story<ComponentProps<typeof Area>> = (args) => <Area {...args} />
  template.args = args
  return template
}

export const Default = createStory({
  name: 'Hello',
  children: 'world',
})
