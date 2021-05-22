import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import Radio from './index'

const RadioButton = {
  title: 'form/Radio',
  component: Radio,
}

export default RadioButton

function createStory(args: ComponentProps<typeof Radio>) {
  const template: Story<ComponentProps<typeof Radio>> = (args) => <Radio {...args} />
  template.args = args
  return template
}

export const Default = createStory({})

export const Checked = createStory({
  checked: true,
})

export const Disabled = createStory({
  disabled: true,
})
export const DisabledChecked = createStory({
  disabled: true,
  checked: true,
})
