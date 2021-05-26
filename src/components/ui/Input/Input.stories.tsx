import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import Input from './index'

const InputStory = {
  title: 'form/Input',
  component: Input,
}

export default InputStory

function createStory(args: ComponentProps<typeof Input>) {
  const template: Story<ComponentProps<typeof Input>> = (args) => <Input {...args} />
  template.args = args
  return template
}

export const Default = createStory({
  placeholder: 'Type here...',
})
export const Masked = createStory({
  mask: [/\d/, /\d/, /\d/],
  placeholder: '3 digits only',
})
