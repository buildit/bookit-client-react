import React from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'

import GroupedBookingsList from 'Components/GroupedBookingsList'
import WeekSpinner from 'Components/WeekSpinner'

import { getWeekDaysRange, formatDate } from 'Utils'

import styles from 'Styles/bookings.scss'

import { actionCreators, selectors } from 'Redux'

export class BookingsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      viewingDate: formatDate(new Date),
    }

    this.updateViewingDate = this.updateViewingDate.bind(this)
  }

  componentDidMount() {
    if (this.props.toasts) {
      this.toastify(this.props.toasts)
    }
  }

  updateViewingDate = (date) => {
    this.setState({ viewingDate: date })
  }

  //TODO: make into higher-order component
  toastify = message => toast(message, {
    onClose: () => this.props.dispatch(actionCreators.clearToasts()),
    type: 'success',
  });

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
          { bookingDaysRange.map(d => <GroupedBookingsList key={d} date={d} />) }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  toasts: selectors.getToasts(state),
})

export default connect(mapStateToProps)(BookingsList)
