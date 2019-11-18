import React from 'react'
import GlobalStyle from 'global-style'
import { ErrorBoundary } from 'components/error-boundary'
import { StoreProvider } from 'easy-peasy'
import { Page } from 'components/page'
import { store } from 'store'

export const App = () => <>
  <GlobalStyle />
  <ErrorBoundary>
    <StoreProvider store={store}>
      <Page />
    </StoreProvider>
  </ErrorBoundary>
</>