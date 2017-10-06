import React from 'react'

import { connect } from 'react-redux'

import { bookingRequest } from 'Actions'
import { getBookingStatus, getRequestInProgress } from 'Selectors'

import Button from 'Components/Button'

interface StateToProps {
  bookingStatus: boolean
  requestInProgress: boolean
}

interface SFCBookingButtonProps extends StateToProps {
  handleBookingRequest: () => void
}

export const BookingButton: React.SFC<SFCBookingButtonProps> = (props) => {
  const { bookingStatus, requestInProgress, handleBookingRequest } = props

  const handleClick = () => { handleBookingRequest() }

  return (
    <div>
      { !bookingStatus &&
        <Button id="bookit" disabled={requestInProgress} onClick={handleClick}>
          Book a Room
        </Button>
      }
      { bookingStatus &&
        <span>Booked!</span>
      }
    </div>
  )
}

/* istanbul ignore next */
const mapStateToProps = (state: StateToProps) => ({
  bookingStatus: getBookingStatus(state),
  requestInProgress: getRequestInProgress(state),
})

export default connect(mapStateToProps, { handleBookingRequest: bookingRequest })(BookingButton)
