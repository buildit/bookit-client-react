import React from 'react'
import PropTypes from 'prop-types'

import { Set } from 'immutable'

const BookingList = ({ bookings }) => {
  console.log('BOOKINGS:', bookings)
  return (
    <div>
      { bookings.map(booking => <p key={booking}>BOOKING: { booking }</p>) }
    </div>
  )
}

BookingList.propTypes = {
  bookings: PropTypes.instanceOf(Set),
}

export default BookingList
