import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { bookingRequest } from 'Actions'
import { getBookingStatus, getRequestInProgress } from 'Selectors'

import Button from './Button'

export class BookingButton extends Component {
  static propTypes = {
    bookingRequest: PropTypes.func,
    bookingStatus: PropTypes.bool,
    requestInProgress: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    this.props.bookingRequest()
  }

  render() {
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
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  bookingStatus: getBookingStatus(state),
  requestInProgress: getRequestInProgress(state),
})

export default connect(mapStateToProps, { bookingRequest })(BookingButton)
