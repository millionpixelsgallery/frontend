import React, { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Row } from './index'
import styled from 'styled-components'

export default {
  title: 'Grid/Row',
  component: Row,
}

const Box = styled.div`
  min-height: 150px;
  width: 150px;
  background-color: orange;
  border: 2px solid #1c1c1c;
`

function createStory(args: ComponentProps<typeof Row>) {
  args.style = args.style ?? { height: 250, border: '2px dashed #1c1c1c' }
  const template: Story<ComponentProps<typeof Row>> = (args) => (
    <Row {...args}>
      <Box />
      <Box />
      <Box />
      <Box />
    </Row>
  )
  template.args = args
  return template
}

export const Default = createStory({})
export const WithGap = createStory({ gap: 10 })
export const Reverse = createStory({ reverse: true })

export const JustifyStart = createStory({ justify: 'start' })
export const JustifyEnd = createStory({ justify: 'end' })
export const JustifySpaceBetween = createStory({ justify: 'between' })
export const JustifySpaceEvenly = createStory({ justify: 'evenly' })
export const JustifySpaceAround = createStory({ justify: 'around' })
export const JustifyCenter = createStory({ justify: 'center' })

export const AlignStart = createStory({ align: 'start' })
export const AlignEnd = createStory({ align: 'end' })
export const AlignStretch = createStory({ align: 'stretch' })
export const AlignCenter = createStory({ align: 'center' })
