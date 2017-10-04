import * as React from 'react'

import * as Redux from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import createRoutes from 'Routes'

const routes = createRoutes()

interface RootProps {
  store: any;
  history: any;
}

/* istanbul ignore next */
const Root = (rp: RootProps) => (
  <Redux.Provider store={rp.store}>
    <ConnectedRouter history={rp.history}>
      { routes }
    </ConnectedRouter>
  </Redux.Provider>
)

export default Root
