import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import Text from './index'

const TextStory = {
  title: 'Text',
  component: Text,
}

export default TextStory

function createStory(args: ComponentProps<typeof Text>) {
  const template: Story<ComponentProps<typeof Text>> = (args) => <Text {...args} />
  template.args = args
  return template
}

export const Default = createStory({
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur aut corporis eum fugiat',
})

export const LGray = createStory({
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur aut corporis eum fugiat',
  type: 'LGray',
})

export const M = createStory({
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur aut corporis eum fugiat',
  type: 'M',
})

export const Custom = createStory({
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur aut corporis eum fugiat',
  color: 'red',
})
