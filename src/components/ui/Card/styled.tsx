import styled from 'styled-components'
import { CardTypes } from 'components/ui/Card/index'
import choose from 'utils/choose'

export interface CardSCProps {
  type: CardTypes
}

export const CardSC = styled.div<CardSCProps>`

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: ${({ type }) =>
      choose(type, {
        default: '#5E72EB;',
        success: '#5DC499;',
        error: '#fe504f;',
      })};
    font: normal normal 600 22px/32px Oswald;
    letter-spacing: 0.44px;
    color: #FFFFFF;
    text-transform: uppercase;
    text-align: center;
    border-radius: 20px 20px 0 0;
    padding-left: 10px;
    padding-right: 10px;
  };
  
  text-overflow: ellipsis;
  position: relative;
  padding: 32px 24px 24px;
  background-color: #FFFFFF;
  box-shadow: 0 8px 20px #0B074233;
  border-radius: 28px;
  opacity: 1;
  
  border: ${({ type }) =>
    choose(type, {
      default: '5px solid #5E72EB;',
      success: '5px solid #5DC499;',
      error: '5px solid #fe504f',
    })};

`

