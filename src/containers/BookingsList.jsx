import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { selectors } from 'Redux'

import GroupedBookingsList from 'Components/GroupedBookingsList'

import styles from 'Styles/bookings.scss'

export class BookingsList extends React.Component {
  render() {
    const { groupedBookings } = this.props
    console.log('GROUPEDBOOKINGS:', groupedBookings)
    return (
      <div className={styles.bookings}>
        <div className={styles.heading}>
          <h2 className={styles.title}>All Bookings</h2>
          <Link to="/" className={styles.cancel}>X</Link>
        </div>
        <div>
          { groupedBookings.map(
            ({ date, bookingIds }) => <GroupedBookingsList key={date} date={date} bookingIds={bookingIds} />
          )}
        </div>
      </div>
    )
  }
}

BookingsList.propTypes = {
  groupedBookings: PropTypes.array,
}


const mapStateToProps = state => ({
  groupedBookings: selectors.getBookingsGroupedByDay(state),
})

export default connect(mapStateToProps)(BookingsList)
