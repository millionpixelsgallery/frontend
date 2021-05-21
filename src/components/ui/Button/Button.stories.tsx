import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import Button from './index'

export default {
  title: 'Button',
  component: Button,
}

function createStory(args: ComponentProps<typeof Button>) {
  const template: Story<ComponentProps<typeof Button>> = (args) => <Button {...args} />
  template.args = args
  return template
}

export const Default = createStory({
  children: 'lorem',
})

export const Disabled = createStory({
  children: 'lorem',
  shadow: true,
  size: 'sm',
  disabled: true,
})

export const WithShadow = createStory({
  children: 'lorem',
  shadow: true,
})

export const Outlined = createStory({
  children: 'lorem',
  type: 'outlined',
  width: 150,
  shadow: true,
})

export const OutlinedOrange = createStory({
  children: 'EDIT',
  type: 'outlined_orange',
  size: 'sm',
  shadow: true,
})

export const Underline = createStory({
  children: 'lorem',
  type: 'underline',
})

export const Wrapper = createStory({
  children: 'lorem',
  type: 'wrapper',
})
