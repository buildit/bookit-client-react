import React from 'react'

import { Route, Switch, withRouter } from 'react-router'

import { TransitionGroup, CSSTransition } from 'react-transition-group'

import App from 'Containers/App'
import Landing from 'Containers/Landing'

const AppRoutes = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames='slide' timeout={1000}>
      <Switch location={location}>
        <Route exact path="/" component={Landing} />
        <Route exact path="/book" component={App} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
))

export default AppRoutes
