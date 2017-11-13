import React from 'react'
import PropTypes from 'prop-types'

import withBooking from 'Hoc/with-booking'
import { BookingItem as BaseBookingItem } from 'Components/BookingItem'

import styles from 'Styles/grouped-bookings.scss'

const BookingItem = withBooking(BaseBookingItem)

export class GroupedBookingsList extends React.Component {
  render() {
    const { date, bookingIds } = this.props
    console.log('HALLO!', date, bookingIds)
    return (
      <div className={styles.bookings}>
        <div className={styles.heading}>
          <h2 className={styles.title}>{ date }</h2>
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

GroupedBookingsList.propTypes = {
  date: PropTypes.string,
  bookingIds: PropTypes.array,
}

export default GroupedBookingsList
