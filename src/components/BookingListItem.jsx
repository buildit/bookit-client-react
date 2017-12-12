import React from 'react'

import { Link } from 'react-router-dom'

import BaseBookingItem from 'Components/BaseBookingItem'

import withBooking from 'Hoc/with-booking'

const BookingListItem = ({ id, ...props }) => (
  <Link to={`/bookings/${id}`}><BaseBookingItem id={id} {...props} /></Link>
)

BookingListItem.propTypes = {
  id: BaseBookingItem.propTypes.id,
}

export default withBooking(BookingListItem)
