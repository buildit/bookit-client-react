import React from 'react'

import { Route, Switch } from 'react-router'

import App from 'Containers/App'
import Landing from 'Containers/Landing'

const createRoutes = () => (
  <Switch>
    <Route path="/book" component={App} />
    <Route path="/" component={Landing} />
  </Switch>
)

export default createRoutes
