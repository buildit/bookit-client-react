import React from 'react'

import {ConnectedBookingButton, BookingButton} from 'Components/BookingButton'

const App = () => (
  <div>
    <BookingButton bookingRequest={() => {console.log("Got request")}}
                   bookingStatus={false}
                   requestInProgress={false}/>
    <ConnectedBookingButton bookingRequest={() => {console.log("Got connected request")}}
                             bookingStatus={false}
                             requestInProgress={false}/>
  </div>
)

export default App
