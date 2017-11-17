import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { selectors } from 'Redux'

import { formatDate, isToday } from 'Utils'

import withBooking from 'Hoc/with-booking'
import BaseBookingItem from 'Components/BaseBookingItem'

import styles from 'Styles/grouped-bookings.scss'

const BookingItem = withBooking(BaseBookingItem)

export class GroupedBookingsList extends React.Component {
  render() {
    const { date, bookingIds } = this.props
    return (
      <div className={styles.groupedBookingList}>
        <div className={styles.heading}>
          <h4 className={styles.title}>
            { isToday(date) && 'TODAY - ' }
            { formatDate(date, 'ddd MMM D').toUpperCase() }
          </h4>
        </div>
        { bookingIds.map(id => <BookingItem key={id} id={id} />) }
        { !bookingIds.length && <p className={styles.noBooking}>No bookings to show</p> }
      </div>
    )
  }
}

GroupedBookingsList.propTypes = {
  date: PropTypes.string,
  bookingIds: PropTypes.array,
}

const mapStateToProps = (state, props) => ({
  bookingIds: selectors.getBookingsForDate(state, props),
})

export default connect(mapStateToProps)(GroupedBookingsList)
