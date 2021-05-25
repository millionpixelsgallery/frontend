import { ComponentProps } from 'react'
import { Story } from '@storybook/react/types-6-0'

import Modal from './index'
import Button from 'components/ui/Button'
import { Col } from 'components/ui/Grid'

const ModalStory = {
  title: 'Modal',
  component: Modal,
}

export default ModalStory

function createStory(args: ComponentProps<typeof Modal>) {
  const template: Story<ComponentProps<typeof Modal>> = (args) => <Modal {...args} />
  template.args = args
  return template
}

function HelloWorld({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ padding: '20px' }}>
      <Col justify={'between'} style={{ width: '800px', height: '300px', marginTop: '50px' }}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium commodi consectetur
          consequatur consequuntur distinctio doloribus esse maiores nisi odit officiis praesentium
          quibusdam, ratione, sapiente temporibus, vero! Ipsa pariatur qui quibusdam.
        </div>
        <Button type={'outlined_orange'} size={'sm'} onClick={onClose}>
          Close
        </Button>
      </Col>
    </div>
  )
}

export const Default = createStory({
  trigger: (
    <Button type={'outlined_orange'} size={'sm'}>
      Open modal
    </Button>
  ),
  closable: true,
  showArrow: true,
  component: HelloWorld,
})
