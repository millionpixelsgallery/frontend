import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import Burger from './index'

const BurgerStory = {
  title: 'Burger',
  component: Burger,
}

export default BurgerStory

function createStory(args: ComponentProps<typeof Burger>) {
  const template: Story<ComponentProps<typeof Burger>> = (args) => <Burger {...args} />
  template.args = args
  return template
}

export const Default = createStory({})
