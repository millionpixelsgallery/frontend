import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import Timer from './index'
import { DateTime } from 'luxon'

const TimerStory = {
  title: 'Timer',
  component: Timer,
}

export default TimerStory

function createStory(args: ComponentProps<typeof Timer>) {
  const template: Story<ComponentProps<typeof Timer>> = (args) => <Timer {...args} />
  template.args = args
  return template
}

export const Default = createStory({
  end: DateTime.local().plus({ year: 1 }),
  color: 'magenta',
  name: 'Test timer name',
})
