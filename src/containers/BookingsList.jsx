import React from 'react'

import { Link } from 'react-router-dom'

import GroupedBookingsList from 'Components/GroupedBookingsList'
import WeekSpinner from 'Components/WeekSpinner'

import { getWeekDaysRange, formatDate } from 'Utils'

import styles from 'Styles/bookings.scss'

export default class BookingsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      viewingDate: formatDate(new Date),
    }

    this.updateViewingDate = this.updateViewingDate.bind(this)
  }

  updateViewingDate = (date) => {
    this.setState({ viewingDate: date })
  }

  render() {
    const { viewingDate } = this.state

    const bookingDaysRange = getWeekDaysRange(viewingDate)

    return (
      <div className={styles.bookings}>
        <div className={styles.heading}>
          <h2 className={styles.title}>All Bookings</h2>
          <Link to="/" className={styles.cancel}>X</Link>
        </div>

        <WeekSpinner weekOf={viewingDate} onClick={this.updateViewingDate} />

        <div>
          { bookingDaysRange.map(d => <GroupedBookingsList key={d} date={d} />) }
        </div>
      </div>
    )
  }
}
