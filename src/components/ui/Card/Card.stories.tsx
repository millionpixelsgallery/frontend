import React, { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'
import Card from 'components/ui/Card'

const storyData = {
  title: 'Card',
  component: Card,
}
export default storyData

function createStory(args: ComponentProps<typeof Card>) {
  const template: Story<ComponentProps<typeof Card>> = ({ children, ...args }) => (
    <Card {...args}>{children}</Card>
  )
  template.args = args
  return template
}

export const Default = createStory({
  children: 'Some Text',
  type: 'default',
})

export const Success = createStory({
  children: 'Some Text',
  type: 'success',
})

export const Error = createStory({
  children: 'Some Text',
  type: 'error',
})
