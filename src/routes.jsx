import React from 'react'

import { Route, Switch, withRouter } from 'react-router'

import { TransitionGroup } from 'react-transition-group'

import SlideOver from 'Components/SlideOver'

import App from 'Containers/App'
import Landing from 'Containers/Landing'

const AppRoutes = withRouter(({ location }) => (
  <TransitionGroup className="app-container">
    <SlideOver key={location.key}>
      <Switch location={location}>
        <Route exact path="/" component={Landing} />
        <Route exact path="/book" component={App} />
      </Switch>
    </SlideOver>
  </TransitionGroup>
))

export default AppRoutes
