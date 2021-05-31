import React, { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'
import FileInput from 'components/ui/FileInput'
import Button from 'components/ui/Button'

const FileInputStory = {
  title: 'Form/FileInput',
  component: FileInput,
}

export default FileInputStory

function createStory(args: ComponentProps<typeof FileInput>) {
  const template: Story<ComponentProps<typeof FileInput>> = ({ ...args }) => <FileInput {...args} />
  template.args = args
  return template
}

export const Default = createStory({
  children: <Button>load</Button>,

  name: 'load',
})
