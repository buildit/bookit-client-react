import React from 'react'
import { connect } from 'react-redux'

import { RootState } from 'Redux'
import { actionCreators, BookingSelectors } from 'Redux/booking'
import { AppSelectors } from 'Redux/app'

import Button from 'Components/Button'
import {Booking} from '../models/booking'

interface BookingButtonProps {
  bookingStatus: boolean
  instance?: Booking
  requestInProgress: boolean,
  handleBookingRequest: () => any
}

export const BookingButton: React.SFC<BookingButtonProps> = ({ bookingStatus, instance, requestInProgress, handleBookingRequest }) => {
  const handleClick = () => { handleBookingRequest() }

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

export default connect(mapStateToProps, { handleBookingRequest: actionCreators.bookingRequest })(BookingButton)
