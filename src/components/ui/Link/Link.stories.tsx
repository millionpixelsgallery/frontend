import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import Link from './index'
import { BrowserRouter } from 'react-router-dom'

const storyData = {
  title: 'ui/Link',
  component: Link,
}
export default storyData

function createStory(args: ComponentProps<typeof Link>) {
  const template: Story<ComponentProps<typeof Link>> = (args) => (
    <BrowserRouter>
      <div style={{ backgroundColor: args.type === 'white' ? 'black' : 'inherit' }}>
        <Link {...args} />
      </div>
    </BrowserRouter>
  )
  template.args = args
  return template
}

export const Primary = createStory({
  type: 'primary',
  children: 'This is a primary link',
  to: `#${Math.random() * 10}`,
})
export const Secondary = createStory({
  type: 'secondary',
  children: 'This is a secondary link',
  to: `#${Math.random() * 10}`,
})
export const White = createStory({
  type: 'white',
  children: 'This is a white link',
  to: `#${Math.random() * 10}`,
})
