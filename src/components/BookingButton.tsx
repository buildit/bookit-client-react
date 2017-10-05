import * as React from 'react'

import { connect } from 'react-redux'

import { bookingRequest } from 'Actions'
import { getBookingStatus, getRequestInProgress } from 'Selectors'

import Button from './Button'

interface StateFromProps {
  bookingStatus: boolean
  requestInProgress: boolean
}

interface DispatchFromProps {
  bookingRequest: any
}

interface BookingButtonProps extends StateFromProps, DispatchFromProps {
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
            Book a Room!!!!
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

export const ConnectedBookingButton: React.ComponentClass<BookingButtonProps> = connect<StateFromProps, DispatchFromProps, BookingButtonProps>(mapStateToProps, { bookingRequest })(BookingButton)
