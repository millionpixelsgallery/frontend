import GlobalStyle from 'styles'
import React, { ReactNode, ReactNodeArray } from 'react'
import { ThemeProvider } from 'styled-components'
import { HashRouter } from 'react-router-dom'

import theme from 'lib/theme'

export interface GlobalProps {
  children: ReactNode | ReactNodeArray
}

export default function GlobalProviders({ children }: GlobalProps) {
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </HashRouter>
  )
}
