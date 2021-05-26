import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import Field from './index'
import Input from 'components/ui/Input'

const FieldStory = {
  title: 'form/Field',
  component: Field,
}

export default FieldStory

function createStory(args: ComponentProps<typeof Field>) {
  const template: Story<ComponentProps<typeof Field>> = (args) => <Field {...args} />
  template.args = args
  return template
}

export const Default = createStory({
  name: 'first_name',
  title: 'First name',
  children: <Input placeholder='John Smith' />,
})

export const WidthPrefix = createStory({
  name: 'site', // if a title not set use name for the title
  prefix: 'http://',
  children: <Input defaultValue='google.com' textAlign='left' />,
})

export const WidthPostfix = createStory({
  name: 'width',
  children: <Input defaultValue='1000' textAlign='right' size={4} />,
  postfix: 'px',
})
