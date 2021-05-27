import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import SocialIcon from './index'

const SocialIconStory = {
  title: 'SocialIcon',
  component: SocialIcon,
}

export default SocialIconStory

function createStory(args: ComponentProps<typeof SocialIcon>) {
  const template: Story<ComponentProps<typeof SocialIcon>> = (args) => <SocialIcon {...args} />
  template.args = args
  return template
}

export const Default = createStory({})
