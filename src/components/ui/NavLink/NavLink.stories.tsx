import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'
import { BrowserRouter } from 'react-router-dom'
import NavLink from './index'

export default {
  title: 'NavLink',
  component: NavLink,
}

function createStory(args: ComponentProps<typeof NavLink>) {
  const template: Story<ComponentProps<typeof NavLink>> = (args) => (
    <BrowserRouter>
      <NavLink {...args} />
    </BrowserRouter>
  )
  template.args = args
  return template
}

export const Default = createStory({
  to: '/route',
  children: 'lorem',
})
