import React from 'react'

import { Route, Switch } from 'react-router'

import ApplicationRoutes from 'Containers/ApplicationRoutes'
import RefreshIframe from 'Containers/RefreshIframe'

const App = () => (
  <Switch>
    <Route path="/openid-complete" exact render={() => null} />
    <Route path="/" render={() =>
      [
        <ApplicationRoutes key="application-routes" />,
        <RefreshIframe key="refresh-iframe" />,
      ]
    }/>
  </Switch>
)

export default App
