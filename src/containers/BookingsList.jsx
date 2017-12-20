import React from 'react'

import { Link } from 'react-router-dom'

import GroupedBookingsListContainer from 'Containers/GroupedBookingsListContainer'
import WeekSpinner from 'Components/WeekSpinner'

import withToast from 'Hoc/with-toast'

import { getWeekDaysRange, formatDate } from 'Utils'

import styles from 'Styles/bookings.scss'

export class BookingsList extends React.Component {
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
          <Link to="/home" className={styles.cancel}>X</Link>
        </div>

        <WeekSpinner weekOf={viewingDate} onClick={this.updateViewingDate} />
        <div>
          { bookingDaysRange.map(d => <GroupedBookingsListContainer key={d} date={d} />) }
        </div>
      </div>
    )
  }
}

export default withToast('success')(BookingsList)
