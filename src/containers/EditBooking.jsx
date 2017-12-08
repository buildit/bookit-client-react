import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import cn from 'classnames'

import styles from 'Styles/booking-card.scss'
import BookingCard from 'Components/BookingCard'
import withBooking from 'Hoc/with-booking'

const EditBookingCard = withBooking(BookingCard)

export default class EditBooking extends React.Component {
  render() {
    return (
      <div className={styles.booking}>
        <div className={styles.heading}>
          <Link to="/bookings" className={cn(styles.headingItem, styles.cancel)}>&laquo;</Link>
          <h2 className={cn(styles.headingItem, styles.title)}>Edit Your Booking</h2>
        </div>
        <div>
          <EditBookingCard id={this.props.match.params.id} />
        </div>
      </div>
    )
  }
}

EditBooking.propTypes = {
  match: PropTypes.object,
}
