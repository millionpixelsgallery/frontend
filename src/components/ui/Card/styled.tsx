import styled from 'styled-components'
import { CardTypes } from 'components/ui/Card/index'
import choose from 'utils/choose'

export interface CardSCProps {
  type: CardTypes
}

export const CardSC = styled.div<CardSCProps>`
  background-color: ${({ theme }) => theme.color.card.background};
  box-shadow: ${({ theme }) => `0 8px 20px ${theme.color.card.shadow}`};
  border-radius: 28px;

  border: ${({ type, theme }) =>
    choose(type, {
      default: `5px solid ${theme.color.card.default}`,
      success: `5px solid ${theme.color.card.success}`,
      error: `5px solid ${theme.color.card.error}`,
    })};

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: ${({ type, theme }) =>
      choose(type, {
        default: theme.color.card.default,
        success: theme.color.card.success,
        error: theme.color.card.error,
      })};
    font: normal normal 600 22px Oswald;
    letter-spacing: 0.44px;
    color: ${({ theme }) => theme.color.card.title};
    text-transform: uppercase;
    text-align: center;
    border-radius: 20px 20px 0 0;
    padding-left: 10px;
    padding-right: 10px;
    position: relative;
    top: -5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    padding: 10px 15px 15px 20px;
  }
`
