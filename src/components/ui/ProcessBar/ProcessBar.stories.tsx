import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import ProcessBar from './index'

const ProcessBarStory = {
  title: 'ProcessBar',
  component: ProcessBar,
}

export default ProcessBarStory

function createStory(args: ComponentProps<typeof ProcessBar>) {
  const template: Story<ComponentProps<typeof ProcessBar>> = (args) => <ProcessBar {...args} />
  template.args = args
  return template
}

export const Default = createStory({
  steps: ['Review', 'Upload', 'CONFIRM'],
  currentStep: 1,
})
