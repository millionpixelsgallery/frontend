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
  to: `#`,
})
export const Secondary = createStory({
  type: 'secondary',
  children: 'This is a secondary link',
  to: `#`,
})
export const White = createStory({
  type: 'white',
  children: 'This is a white link',
  to: `#`,
})

export const NativePrimary = createStory({
  native: true,
  type: 'primary',
  children: 'This is a native primary link',
  href: `#`,
})
export const NativeSecondary = createStory({
  native: true,
  type: 'secondary',
  children: 'This is a native secondary link',
  href: `#`,
})
export const NativeWhite = createStory({
  native: true,
  type: 'white',
  children: 'This is a native white link',
  href: `#`,
})
