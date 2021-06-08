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
  useEffect,
  useLayoutEffect,
  useMemo,
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
  onVisibilityChange?: (visible: boolean) => void
  onBack?: () => void

  render?: (onVisibleChange: () => void) => ReactNode
  trigger?: ReactElement<{ onClick: Function }>
  visible?: boolean
  defaultVisible?: boolean
  component?: string | ComponentClass<any, any> | FunctionComponent<any>
  componentProps?: { [key: string]: any }

  disabledControlButtons?: boolean
}

function Modal({
  className,
  style,
  closable = true,
  closableByEsc,
  component,
  trigger,
  defaultVisible = false,
  render,
  onBack,
  onClose,
  componentProps = {},
  disabledControlButtons = false,
  onVisibilityChange,
  ...rest
}: ModalProps) {
  let { visible } = rest

  const controlled = useMemo(() => 'visible' in rest, [])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [_visible, _setVisible] = controlled ? [] : useState(defaultVisible)
  if (!controlled) visible = _visible
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    setModalRoot(document.getElementById('modal-root')!)
  }, [])

  const handleVisibleChange = useCallback(() => {
    if (_setVisible) _setVisible(!visible)
    if (onVisibilityChange) onVisibilityChange(!visible)
  }, [visible, _setVisible, onVisibilityChange])
  const handleClose = useCallback(() => {
    if (onClose) onClose()
    if (_setVisible) _setVisible(false)
    if (onVisibilityChange) onVisibilityChange(false)
  }, [_setVisible, onClose, onVisibilityChange])

  useEffect(() => {
    if (!closableByEsc) return
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [closableByEsc, handleClose])

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
                <Button
                  type={'wrapper'}
                  className={'back'}
                  size={'content'}
                  onClick={onBack}
                  disabled={disabledControlButtons}
                >
                  <BackSVG />
                </Button>
              )}
              {closable && (
                <Button
                  type={'wrapper'}
                  className={'close'}
                  size={'content'}
                  onClick={handleClose}
                  disabled={disabledControlButtons}
                >
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
