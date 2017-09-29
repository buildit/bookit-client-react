import * as React from 'react'
import * as PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import createRoutes from 'Routes'

const routes = createRoutes()

// TODO: Set types correctly
interface RootProps {
  store: any
  history: any
}

/* istanbul ignore next */
const Root = ({ store, history }: RootProps) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      { routes }
    </ConnectedRouter>
  </Provider>
)

export default Root
