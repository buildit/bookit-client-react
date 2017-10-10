import * as React from 'react'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import store from 'Store'
import history from 'History'

import createRoutes from 'Routes'

const routes = createRoutes()

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      { routes }
    </ConnectedRouter>
  </Provider>
)

export default Root
