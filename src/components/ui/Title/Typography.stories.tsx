import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import Title from './index'

const TitleStory = {
  title: 'Title',
  component: Title,
}

export default TitleStory

function createStory(args: ComponentProps<typeof Title>) {
  const template: Story<ComponentProps<typeof Title>> = (args) => <Title {...args} />
  template.args = args
  return template
}

export const Default = createStory({
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur aut corporis eum fugiat',
})
