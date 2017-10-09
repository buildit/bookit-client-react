import React from 'react'

import { Route } from 'react-router'

import App from 'Containers/App'

const createRoutes = () => (
  <Route path="/" component={App} />
)

export default createRoutes
