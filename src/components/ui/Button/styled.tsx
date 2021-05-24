import styled from 'styled-components'
import { ButtonSizes, ButtonTypes } from 'components/ui/Button/index'
import { ThemeType } from 'types/modules'

export interface ButtonSCProps {
  $type: ButtonTypes
  $size: ButtonSizes
  $shadow?: boolean
  fontSize?: number
  $width?: number
  $disabled: boolean
}

const getButtonType = (
  theme: ThemeType,
  $type: ButtonTypes,
  $disabled: boolean | undefined,
  $shadow: boolean | undefined,
  $size: ButtonSizes
): string => {
  switch ($type) {
    case 'default':
      return `
        border-radius: 70px;
        text-transform: uppercase;
        letter-spacing: 0px;
        font: normal normal normal 20px/24px RESIN;
        color: ${theme.color.button.default.text};
        ${getShadow($shadow, $size, $disabled)}
        ${
          $disabled
            ? `background: ${theme.color.button.default.disabledBg}; opacity: 0.15;`
            : `background: ${theme.color.button.default.bg};`
        }
      `
    case 'outlined':
      return `
        border-radius: 70px;
        letter-spacing: 0px;
        text-transform: uppercase;
        font: normal normal normal 20px/24px RESIN;
        ${getShadow($shadow, $size, $disabled)}
        border: 2px solid ${theme.color.button.outlined.border};
        color: ${theme.color.button.outlined.text};
      `
    case 'outlined_orange':
      return `
        border-radius: 70px;
        letter-spacing: 0px;
        text-transform: uppercase;
        font: normal normal normal 20px/24px RESIN;
        ${getShadow($shadow, $size, $disabled)}
        border: 1px solid ${theme.color.button.outlined_orange.border};
        color: ${theme.color.button.outlined_orange.text};
      `
    case 'underline':
      return `
        letter-spacing: 0px;
        text-transform: uppercase;
        font: normal normal normal 20px/24px RESIN;
        text-decoration: underline;
        color: ${theme.color.button.underline.text};
      `
    case 'wrapper':
      return ``
  }
}

const getButtonSize = ($size: ButtonSizes): string => {
  switch ($size) {
    case 'lg':
      return '50px'
    case 'md':
      return '38px'
    case 'sm':
      return '32px'
    case 'content':
      return 'auto'
  }
}

const getShadow = (
  $shadow: boolean | undefined,
  $size: ButtonSizes,
  disabled: boolean | undefined
): string => {
  if ($shadow === false) return ''
  switch ($size) {
    case 'lg':
      return `
      box-shadow: 0px 8px 20px #0b07420f;
      ${disabled ? '' : '&:hover {box-shadow: 0px 8px 20px #0B074233;}'}
      `
    case 'md':
    case 'sm':
      return `
      box-shadow: 0px 4px 10px #0b07420f;
      ${disabled ? '' : '&:hover { box-shadow: 0px 4px 10px #0B074233;}'}
      `
    default:
      return ''
  }
}

const getWidth = (width: number | undefined, $size: ButtonSizes): string => {
  if (width !== undefined) return `width: ${width}px;`
  switch ($size) {
    case 'sm':
      return 'padding: 0 23px;'
    case 'md':
      return 'padding: 0 45px;'
    case 'lg':
      return 'padding: 0 15px;'
    case 'content':
      return ''
  }
}

export const ButtonSC = styled.button<ButtonSCProps>`
  position: relative;
  cursor: ${({ $disabled }) => ($disabled ? 'inherit' : 'pointer')};
  padding: 0;
  border: none;
  outline: none;
  font: inherit;
  color: inherit;
  background: none;
  transition: 0.4s;
  font-size: ${({ theme, fontSize }) =>
    fontSize !== undefined ? theme.pxToRem(fontSize) : 'inherit'};
  height: ${({ $size }) => getButtonSize($size)};
  ${({ $width, $size }) => getWidth($width, $size)}
  ${({ theme, $type, $disabled, $size, $shadow }) =>
    getButtonType(theme, $type, $disabled, $shadow, $size)};
`
