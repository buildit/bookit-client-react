import React from 'react'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import store from 'Store'
import history from 'History'

import ApplicationRoutes from 'Containers/ApplicationRoutes'

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ApplicationRoutes />
    </ConnectedRouter>
  </Provider>
)

export default Root
