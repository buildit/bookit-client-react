import React from 'react'
// import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import styles from 'Styles/bookings.scss'

export default class EditBooking extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.heading}>
          <Link to="/bookings" className={styles.cancel}>&laquo;</Link>
          <h2 className={styles.title}>Edit Your Booking</h2>
        </div>
      </div>
    )
  }
}
