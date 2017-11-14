import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { selectors } from 'Redux'

import { formatDate } from 'Utils'

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
          <h2 className={styles.title}>{ formatDate(date, 'ddd MMM D').toUpperCase() }</h2>
        </div>
        { bookingIds.map(id => <BookingItem key={id} id={id} />) }
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
