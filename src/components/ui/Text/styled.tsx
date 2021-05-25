import styled from 'styled-components'
import { TextProps } from 'components/ui/Text/index'
import choose from 'utils/choose'

export interface TextSCProps {
  $type: Required<TextProps>['type']
  $block: TextProps['block']
  $color: TextProps['color']
  $weight: TextProps['weight']
  $size: TextProps['size']
  lineHeight: TextProps['lineHeight']
  letterSpacing: TextProps['letterSpacing']
}

const getCSSValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return ''
  return `${key}:${value};`
}

export const TextSC = styled.span<TextSCProps>`
  font-family: 'Oswald', sans-serif;
  text-transform: uppercase;

  font-size: ${({ $type }) =>
    choose($type, {
      XL: '22px',
      L: '18px',
      LGray: '18px',
      M: '16px',
      MGray: '16px',
      S: '14px',
    })};

  line-height: ${({ $type }) =>
    choose($type, {
      XL: '24px',
      L: '28px',
      LGray: '28px',
      M: '24px',
      MGray: '24px',
      S: '21px',
    })};

  letter-spacing: ${({ $type }) =>
    choose($type, {
      XL: '0.64px',
      L: '0.36px',
      LGray: '0.36px',
      M: '0.32px',
      MGray: '0.32px',
      S: '0.28px',
    })};

  font-weight: ${({ $type }) =>
    choose($type, {
      XL: 600,
      L: 'normal',
      LGray: 'normal',
      M: 'normal',
      MGray: 'normal',
      S: 'normal',
    })};

  color: ${({ $type, theme }) =>
    choose($type, {
      XL: theme.color.typography.text,
      L: theme.color.typography.text,
      LGray: theme.color.typography.gray,
      M: theme.color.typography.text,
      MGray: theme.color.typography.gray,
      S: theme.color.typography.text,
    })};

  ${({ $color }) => getCSSValue('color', $color)}
  ${({ $weight }) => getCSSValue('font-weight', $weight)}
  ${({ lineHeight, theme }) =>
    lineHeight !== undefined ? 'line-height:' + theme.px(lineHeight) : ''};
  ${({ letterSpacing, theme }) =>
    letterSpacing !== undefined ? 'letter-spacing:' + theme.px(letterSpacing) : ''};
  ${({ $size, theme }) => ($size !== undefined ? 'font-size:' + theme.px($size) : '')};
  ${({ $block }) => ($block ? 'display: block;' : 'display: inline;')}
`
