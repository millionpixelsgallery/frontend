import GlobalStyle from 'styles'
import React, { ReactNode, ReactNodeArray } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import theme from 'lib/theme'

export interface GlobalProps {
  children: ReactNode | ReactNodeArray
}

export default function GlobalProviders({ children }: GlobalProps) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </BrowserRouter>
  )
}
