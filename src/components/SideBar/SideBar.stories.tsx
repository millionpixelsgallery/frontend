import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import SideBar from './index'

const SideBarStory = {
  title: 'SideBar',
  component: SideBar,
}

export default SideBarStory

function createStory(args: ComponentProps<typeof SideBar>) {
  const template: Story<ComponentProps<typeof SideBar>> = (args) => <SideBar {...args} />
  template.args = args
  return template
}

export const Default = createStory({})
