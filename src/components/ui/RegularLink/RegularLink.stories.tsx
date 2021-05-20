import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import RegularLink from './index'
const storyData = {
  title: 'ui/RegularLink',
  component: RegularLink,
}
export default storyData

function createStory(args: ComponentProps<typeof RegularLink>) {
  const template: Story<ComponentProps<typeof RegularLink>> = (args) => (
    <div style={{ backgroundColor: args.type === 'white' ? 'black' : 'inherit' }}>
      <RegularLink {...args} />
    </div>
  )
  template.args = args
  return template
}

export const Primary = createStory({
  type: 'primary',
  children: 'This is a primary link',
  href: `#${Math.random() * 10}`,
})
export const Secondary = createStory({
  type: 'secondary',
  children: 'This is a secondary link',
  href: `#${Math.random() * 10}`,
})
export const White = createStory({
  type: 'white',
  children: 'This is a white link',
  href: `#${Math.random() * 10}`,
})
