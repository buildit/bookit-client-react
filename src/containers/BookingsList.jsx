import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { compose } from 'redux'

import { Link } from 'react-router-dom'

import withToast from 'Hoc/with-toast'

import GroupedBookingsListContainer from 'Containers/GroupedBookingsListContainer'
import WeekSpinner from 'Components/WeekSpinner'

import { actionCreators } from 'Redux'
import { getWeekDaysRange, formatDate } from 'Utils'

import styles from 'Styles/bookings.scss'

export class BookingsList extends React.Component {
  static propTypes = {
    getBookingsForWeek: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      viewingDate: formatDate(new Date),
    }

    this.updateViewingDate = this.updateViewingDate.bind(this)
  }


  componentDidMount() {
    this.getBookingsForWeek()
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState)
    if (prevState.viewingDate != this.state.viewingDate) {
      this.getBookingsForWeek()
    }
  }

  updateViewingDate = date => this.setState({ viewingDate: date })
  getBookingsForWeek = () => this.props.getBookingsForWeek(this.state.viewingDate)

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

// export default withToast('success')(BookingsList)

const enhance = compose(
  connect(null, { getBookingsForWeek: actionCreators.getBookingsForWeek }),
  withToast('success')
)

export default enhance(BookingsList)
