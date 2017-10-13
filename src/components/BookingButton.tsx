import React from 'react'
import { connect } from 'react-redux'

import { RootState } from 'Redux'
// import { actionCreators, BookingSelectors } from 'Redux/booking'
import { BookingSelectors } from 'Redux/booking'
import { createBooking } from 'Redux/api'
import { AppSelectors } from 'Redux/app'

import Button from 'Components/Button'
import { Booking, BookingRequest } from 'Models'

interface BookingButtonProps {
  bookingStatus: boolean
  instance?: Booking
  requestInProgress: boolean,
  createBooking: any
}

const request: BookingRequest = {
  bookableId: 1,
  endDateTime: '2017-09-26T09:00:00.000-04:00',
  startDateTime: '2017-09-26T09:00:00.000-04:00',
  subject: 'My New Meeting',
}

export const BookingButton: React.SFC<BookingButtonProps> = ({ bookingStatus, instance, requestInProgress, createBooking }) => {
  const handleClick = () => {
    console.log('REQUEST', request)
    const foo = createBooking({
      bookableId: 1,
      endDateTime: '2017-09-26T09:00:00.000-04:00',
      startDateTime: '2017-09-26T09:00:00.000-04:00',
      subject: 'My New Meeting',
    })
    console.log(foo)
  }

  return (
    <div>
      { !bookingStatus &&
        <Button id="bookit" disabled={requestInProgress} onClick={handleClick}>
          Book a Room or MELONS!
        </Button>
      }
      { bookingStatus &&
        <span>Booked '{instance && instance.subject}'</span>
      }
    </div>
  )
}

/* istanbul ignore next */
const mapStateToProps = (state: RootState) => ({
  bookingStatus: BookingSelectors.getBookingStatus(state),
  instance: BookingSelectors.getBookingInstance(state),
  requestInProgress: AppSelectors.getRequestInProgress(state),
})

// export default connect(mapStateToProps, { handleBookingRequest: actionCreators.bookingRequest })(BookingButton)
export default connect(mapStateToProps, { createBooking })(BookingButton)
