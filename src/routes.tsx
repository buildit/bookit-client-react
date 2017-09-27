import * as React from 'react'

import { Route } from 'react-router'

import App from './containers/App'

const createRoutes = () => (
  <Route path="/" component={App} />
)

export default createRoutes
