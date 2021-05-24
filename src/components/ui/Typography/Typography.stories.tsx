import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import Typography from './index'

const TypographyStory = {
  title: 'Typography',
  component: Typography,
}

export default TypographyStory

function createStory(args: ComponentProps<typeof Typography>) {
  const template: Story<ComponentProps<typeof Typography>> = (args) => <Typography {...args} />
  template.args = args
  return template
}

export const Title = createStory({
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur aut corporis eum fugiat',
})

export const Text = createStory({
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur aut corporis eum fugiat',
  type: 'text',
})
