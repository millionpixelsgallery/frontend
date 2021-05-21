import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'
import NavLink from './index'

const NavLinkStory = {
  title: 'NavLink',
  component: NavLink,
}

export default NavLinkStory

function createStory(args: ComponentProps<typeof NavLink>) {
  const template: Story<ComponentProps<typeof NavLink>> = (args) => <NavLink {...args} />
  template.args = args
  return template
}

export const Default = createStory({
  to: '/route',
  children: 'lorem',
})
