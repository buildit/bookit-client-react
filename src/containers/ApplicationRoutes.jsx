import React from 'react'

import { Route, Switch } from 'react-router'

import { TransitionGroup } from 'react-transition-group'

import SlideOver from 'Components/SlideOver'

import App from 'Containers/App'
import Landing from 'Containers/Landing'
import BookablesList from 'Containers/BookablesList'

const ApplicationRoutes = () => (
  <Route render={({ location }) => (
    <TransitionGroup className="app-container">
      <SlideOver key={location.key}>
        <Switch key={location.key} location={location}>
          <Route exact path="/" component={Landing} />
          <Route exact path="/book" component={App} />
          <Route exact path="/rooms" component={BookablesList} />
        </Switch>
      </SlideOver>
    </TransitionGroup>
  )}/>
)

export default ApplicationRoutes
