import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { selectors } from 'Redux'

import { Link } from 'react-router-dom'

import GroupedBookingsList from 'Components/GroupedBookingsList'

import styles from 'Styles/bookings.scss'

export class BookingsList extends React.Component {
  render() {
    const { bookingDates } = this.props

    return (
      <div className={styles.bookings}>
        <div className={styles.heading}>
          <h2 className={styles.title}>All Bookings</h2>
          <Link to="/" className={styles.cancel}>X</Link>
        </div>
        <div>
          { bookingDates.map(date => <GroupedBookingsList key={date} date={date} />) }
        </div>
      </div>
    )
  }
}

BookingsList.propTypes = {
  bookingDates: PropTypes.array,
}


const mapStateToProps = state => ({
  bookingDates: selectors.getBookingDates(state),
})

export default connect(mapStateToProps)(BookingsList)
