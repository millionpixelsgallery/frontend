import styled from 'styled-components'
import { TypographyProps } from 'components/ui/Typography/index'
import choose from 'utils/choose'

export interface TypographySCProps {
  $type: Required<TypographyProps>['type']
}

export const TypographySC = styled.span<TypographySCProps>`
  font-size: ${({ $type }) =>
    choose($type, {
      title: '32px',
      text: '18px',
    })};

  font-weight: ${({ $type }) =>
    choose($type, {
      title: 600,
      text: 'normal',
    })};

  text-transform: ${({ $type }) =>
    choose($type, {
      title: 'uppercase',
      text: 'uppercase',
    })};

  color: ${({ $type, theme }) =>
    choose($type, {
      title: theme.color.typography.title,
      text: theme.color.typography.text,
    })};

  line-height: ${({ $type }) =>
    choose($type, {
      title: '47px',
      text: '28px',
    })};

  letter-spacing: ${({ $type }) =>
    choose($type, {
      title: '0.64px',
      text: '0.36px',
    })};

  font-family: ${({ $type }) =>
    choose($type, {
      title: "'Oswald', sans-serif",
      text: "'Oswald', sans-serif",
    })};
`
