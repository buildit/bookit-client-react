import React from 'react'

import { Route, Switch } from 'react-router'

import { TransitionGroup } from 'react-transition-group'

import SlideOver from 'Components/SlideOver'

import App from 'Containers/App'
import Landing from 'Containers/Landing'
import BookingsList from 'Containers/BookingsList'

const ApplicationRoutes = () => (
  <Route render={({ location }) => (
    <TransitionGroup className="app-container">
      <SlideOver key={location.key}>
        <Switch key={location.key} location={location}>
          <Route exact path="/" component={Landing} />
          <Route path="/book" component={App} />
          <Route path="/bookings" component={BookingsList} />
        </Switch>
      </SlideOver>
    </TransitionGroup>
  )}/>
)

export default ApplicationRoutes
