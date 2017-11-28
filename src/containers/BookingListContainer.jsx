import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'

import { actionCreators, selectors } from 'Redux'

import BookingList from 'Components/BookingList'

const mapStateToProps = state => ({ bookings: selectors.getBookingIds(state) })
const { startPreloadApplication } = actionCreators

const enhance = compose(
  connect(mapStateToProps, { startPreloadApplication }),
  lifecycle({
    componentDidMount() {
      // this.props.getBookings({ start: '2017-11-21', end: '2017-11-22' })
      this.props.startPreloadApplication()
    },
  })
)

export default enhance(BookingList)
