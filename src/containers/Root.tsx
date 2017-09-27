import * as React from 'react'
import * as PropTypes from 'prop-types'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import createRoutes from '../routes'

const routes = createRoutes()

// TODO: Set types correctly
interface Props {
  store: any;
  history: any;
}

/* istanbul ignore next */
const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      { routes }
    </ConnectedRouter>
  </Provider>
)

export default Root
