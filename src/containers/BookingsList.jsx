import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { selectors } from 'Redux'

import { Link } from 'react-router-dom'

import ActionLink from 'Components/ActionLink'
import GroupedBookingsList from 'Components/GroupedBookingsList'

import { getWeekDaysRange } from 'Utils'

import styles from 'Styles/bookings.scss'

export class BookingsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      viewingDate: new Date,
    }

    this.updateViewDate = this.updateViewDate.bind(this)
  }

  updateViewDate = (date) => {
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

        <div>
          <ActionLink onClick={() => this.updateViewDate('2017-11-06')}>PREVIOUS</ActionLink>
          { ' | ' }
          <ActionLink onClick={() => this.updateViewDate('2017-11-20')}>NEXT</ActionLink>
        </div>

        {/* THIS IS WHERE THE WEEK CONTROLS WILL GO */}

        <div>
          { bookingDaysRange.map(d => <GroupedBookingsList key={d} date={d} />) }
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
