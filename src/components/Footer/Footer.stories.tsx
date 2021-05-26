import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import Footer from './index'

const FooterStory = {
  title: 'Footer',
  component: Footer,
}

export default FooterStory

function createStory(args: ComponentProps<typeof Footer>) {
  const template: Story<ComponentProps<typeof Footer>> = (args) => <Footer {...args} />
  template.args = args
  return template
}

export const Default = createStory({})
