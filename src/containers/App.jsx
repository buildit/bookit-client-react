import React from 'react'

import { Route, Switch } from 'react-router'

import { TransitionGroup } from 'react-transition-group'

import SlideOver from 'Components/SlideOver'

import 'Styles/client.scss'

import styles from 'Styles/app.scss'

// import Layout from 'Components/Layout'
// import HeaderBack from 'Components/HeaderBack'
import HeaderClose from 'Components/HeaderClose'
import ListItem from 'Components/ListItem'

import BookingListContainer from 'Containers/BookingListContainer'

// import LandingPage from 'Containers/LandingPage'
// import BookingFormPage from 'Containers/BookingFormPage'
// import BookingsList from 'Containers/BookingsList'

/*
OKAY. HERE'S THE DEAL.

THINGS WE GODDAMN KNOW:
1) At app start, we need to know LOCATIONS and BOOKABLES
2) At app start, the default view shows the user
  - If/When they have an upcoming BOOKING (ie. 'Your next meeting is in X minutes')
  - If/When all BOOKABLES for this LOCATION are available until
  THEREFORE: At app start, we need to get all BOOKINGS for TODAY
3) When viewing ALL BOOKINGS BY WEEK, we can fetch BOOKINGS in WEEK-LONG groups
4) When MAKING A BOOKING, we can fetch BOOKINGS in DAY-LONG groups to real-time check availability
4) ALL OF THIS REQUIRES SOME KINDA NOTION OF "I AM CURRENTLY INTERESTED IN THIS DATE" IN THE GODDAMN STATE
 */

const App = () => (
  <Route render={({ location }) => (
    <TransitionGroup className="app-container">
      <SlideOver key={location.key}>
        <Switch key={location.key} location={location}>
          <Route path="/" render={() => (
            <div className={styles.pageContainer}>
              <header className={styles.pageHeader}>
                <HeaderClose title="BookIt" />
              </header>
              <main className={styles.pageMain}>
                <BookingListContainer />
                <ListItem />
                <ListItem booked />
              </main>
            </div>

          )}/>
          {/*<Route path="/" component={LandingPage} />*/}
          {/*
          <Route path="/" render={() => {
            return [
              <HeaderClose key="1" title="Close" />,
              <HeaderBack key="2" title="Back" />,
              <ListItem key="3" />,
              <ListItem key="4" />,
              <ListItem key="5" booked />,
            ]
          }} />
          */}
          {/*
          <Route exact path="/" component={LandingPage} />
          <Route path="/book" component={BookingFormPage} />
          <Route path="/bookings" component={BookingsList} />
        */}
        </Switch>
      </SlideOver>
    </TransitionGroup>
  )}/>
)

export default App
