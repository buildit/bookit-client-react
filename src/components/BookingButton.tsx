import * as React from 'react'
import * as PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { bookingRequest } from 'Actions'
import { getBookingStatus, getRequestInProgress } from 'Selectors'

import Button from './Button'

interface BookingButtonProps {
  bookingRequest: () => void;
  bookingStatus: any;
  requestInProgress: boolean;
}

export class BookingButton extends React.Component<BookingButtonProps, {}> {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  public render() {
    return (
      <div>
        { !this.props.bookingStatus &&
          <Button id="bookit" disabled={this.props.requestInProgress} onClick={this.handleClick}>
            Book a Room
          </Button>
        }
        { this.props.bookingStatus && <span>Booked!</span> }
      </div>
    )
  }

  private handleClick() {
    this.props.bookingRequest()
  }
}

/* istanbul ignore next */
const mapStateToProps = (state) => ({
  bookingStatus: getBookingStatus(state),
  requestInProgress: getRequestInProgress(state),
})

export default connect(mapStateToProps, { bookingRequest })(BookingButton)
