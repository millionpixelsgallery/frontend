import {
  cloneElement,
  ComponentClass,
  createElement,
  CSSProperties,
  FunctionComponent,
  memo,
  ReactElement,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'
import { GlobalModalStyles, ModalOverlaySC, ModalSC, ModalSCProps } from './styled'
import { createPortal } from 'react-dom'
import { ReactComponent as BackSVG } from './assets/Back.svg'
import { ReactComponent as CloseSVG } from './assets/Close.svg'
import Button from 'components/ui/Button'

export interface ModalProps extends ModalSCProps {
  className?: string
  style?: CSSProperties

  closable?: boolean
  closableByEsc?: boolean
  onClose?: () => void

  onBack?: () => void

  render?: (onVisibleChange: () => void) => ReactNode
  trigger?: ReactElement<{ onClick: Function }>
  defaultVisible?: boolean
  component?: string | ComponentClass<any, any> | FunctionComponent<any>
  componentProps?: { [key: string]: any }
}

function Modal({
  className,
  style,
  closable = true,
  component,
  trigger,
  defaultVisible = false,
  render,
  onBack,
  componentProps = {},
  ...rest
}: ModalProps) {
  const [visible, setVisible] = useState(defaultVisible)
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    setModalRoot(document.getElementById('modal-root')!)
  }, [])

  const handleVisibleChange = useCallback(() => setVisible(!visible), [visible, setVisible])
  const handleClose = useCallback(() => setVisible(false), [setVisible])

  return (
    <>
      {trigger && cloneElement(trigger, { onClick: handleVisibleChange })}
      {modalRoot &&
        visible &&
        createPortal(
          <ModalOverlaySC hidden={!visible}>
            <GlobalModalStyles />
            <ModalSC className={className} style={style} {...rest}>
              {Boolean(onBack) && (
                <Button type={'wrapper'} className={'back'} size={'content'} onClick={onBack}>
                  <BackSVG />
                </Button>
              )}
              {closable && (
                <Button type={'wrapper'} className={'close'} size={'content'} onClick={handleClose}>
                  <CloseSVG />
                </Button>
              )}
              {render
                ? render(handleVisibleChange)
                : component
                ? createElement<any>(component, {
                    ...componentProps,
                    onClose: handleClose,
                    onBack,
                  })
                : null}
            </ModalSC>
          </ModalOverlaySC>,
          modalRoot
        )}
    </>
  )
}

export default memo(Modal)
