import React, { useState } from 'react'
import GlobalStyle from 'shared/app/global-style'
import { ErrorBoundary } from 'shared/components/error'
import { StoreProvider, createStore } from 'easy-peasy'
import { Page } from 'shared/components/page'
import { ControlPanel } from 'shared/components/contol-panel'
import { environments } from 'shared/model/enivironments'

// initialise the store: enables prefetching the data
const initialStore = createStore(environments[0].generateModel())

export const App: React.FC = () => {
  const [ store, setStore ] = useState(initialStore)

  return <>
    <GlobalStyle />
    <ErrorBoundary>
      <StoreProvider store={store}>
        <Page>
          <ControlPanel setStore={setStore}/>
        </Page>
      </StoreProvider>
    </ErrorBoundary>
  </>
}