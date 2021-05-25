import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import Layout from './index'

const LayoutStory = {
  title: 'Layout',
  component: Layout,
}

export default LayoutStory

function createStory(args: ComponentProps<typeof Layout>) {
  const template: Story<ComponentProps<typeof Layout>> = (args) => <Layout {...args} />
  template.args = args
  return template
}

export const Default = createStory({})
