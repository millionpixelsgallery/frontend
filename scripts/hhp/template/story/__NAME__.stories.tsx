import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import __NAME__ from './index'

const __NAME__Story = {
  title: '__NAME__',
  component: __NAME__,
}

export default __NAME__Story

function createStory(args: ComponentProps<typeof __NAME__>) {
  const template: Story<ComponentProps<typeof __NAME__>> = (args) => <__NAME__ {...args} />
  template.args = args
  return template
}

export const Default = createStory({})
