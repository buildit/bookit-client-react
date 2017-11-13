import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { selectors } from 'Redux'

import withBooking from 'Hoc/with-booking'
import { BookingItem as BaseBookingItem } from 'Components/BookingItem'

import styles from 'Styles/bookings.scss'

const BookingItem = withBooking(BaseBookingItem)

export class BookingsList extends React.Component {

  render() {
    const { bookingIds, groupedBookings } = this.props
    console.log(groupedBookings)
    return (
      <div className={styles.bookings}>
        <div className={styles.heading}>
          <h2 className={styles.title}>All Bookings</h2>
          <Link to="/" className={styles.cancel}>X</Link>
        </div>
        <div>
          { bookingIds.map(
            id => <BookingItem key={id} id={id} />
          )}
        </div>
      </div>
    )
  }
}

BookingsList.propTypes = {
  bookingIds: PropTypes.array,
  groupedBookings: PropTypes.Object,
}

const mapStateToProps = state => ({
  bookingIds: selectors.getBookingIds(state),  // Cheating on the locationId a bit
  groupedBookings: selectors.getBookingsGroupedByDay(state),
})

export default connect(mapStateToProps)(BookingsList)
