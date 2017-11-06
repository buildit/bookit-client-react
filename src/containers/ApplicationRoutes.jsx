import React from 'react'

import { Route, Switch } from 'react-router'

import { TransitionGroup } from 'react-transition-group'

import SlideOver from 'Components/SlideOver'

import App from 'Containers/App'
import Landing from 'Containers/Landing'

const ApplicationRoutes = () => (
  <Route render={({ location }) => (
    <TransitionGroup className="app-container">
      <SlideOver key={location.key}>
        <Switch key={location.key} location={location}>
          <Route exact path="/" component={Landing} />
          <Route path="/book" component={App} />
        </Switch>
      </SlideOver>
    </TransitionGroup>
  )}/>
)

export default ApplicationRoutes
