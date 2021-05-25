import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import Header from './index'

const HeaderStory = {
  title: 'Header',
  component: Header,
}

export default HeaderStory

function createStory(args: ComponentProps<typeof Header>) {
  const template: Story<ComponentProps<typeof Header>> = (args) => <Header {...args} />
  template.args = args
  return template
}

export const Default = createStory({})
