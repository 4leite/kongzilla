import React, { useState } from 'react'
import GlobalStyle from 'shared/global-style'
import { ErrorBoundary } from 'shared/components/error'
import { StoreProvider, createStore } from 'easy-peasy'
import { Page } from 'shared/components/page'
import { ControlPanel } from './components/control-panel'
import { environments } from './model/enivironments'
import { clearDeprecatedKeys } from './services/local-storage'

// Remove old keys from local storagage
clearDeprecatedKeys([
  'kongzilla-deleted-routes',
  'lottozilla-deleted-routes'
])
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