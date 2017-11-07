import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// import { connect } from 'react-redux'

// import { BookingSelectors } from 'Redux/booking'

import styles from 'Styles/bookings.scss'

export class BookingsList extends React.Component {

  render() {
    return (
      <div className={styles.bookings}>
        <div className={styles.heading}>
          <h2 className={styles.title}>All Bookings</h2>
          <Link to="/" className={styles.cancel}>X</Link>
        </div>
      </div>
    )
  }
}

export default BookingsList
