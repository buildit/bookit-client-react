import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { Field, reduxForm, hasSubmitSucceeded, isSubmitting } from 'redux-form'

import Moment from 'moment-timezone'

import { actionCreators } from 'Redux'
import { BookingSelectors } from 'Redux/booking'

import Button from 'Components/Button'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

renderField.propTypes = {
  input: PropTypes.any,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
}

const renderSuccessMessage = bookingId => <h1>Booking Created with booking ID {bookingId}!</h1>

export const BookingForm = (props) => {
  const { handleSubmit, createBooking, submitting, bookingInstanceId } = props

  return (
    <div>
      <form onSubmit={ handleSubmit(createBooking) }>
        <Field name="bookableId" component={ renderField } type="hidden" label="Name of Room" />
        <Field name="subject" component={ renderField } label="My Booking" type="text" />
        <Field name="start" component={ renderField } label="Start" type="text" />
        <Field name="end" component={ renderField } label="End" type="text" />
        <Button type="submit" disabled={ submitting } id="bookit">
          Book a Room!
        </Button>
      </form>
      { bookingInstanceId && renderSuccessMessage(bookingInstanceId) }
    </div>
  )
}

BookingForm.propTypes = {
  handleSubmit: PropTypes.func,
  createBooking: PropTypes.func,
  submitting: PropTypes.bool,
  bookingInstanceId: PropTypes.number,
}

const mapStateToProps = state => ({
  bookingInstanceId: BookingSelectors.getBookingInstanceId(state),
  initialValues: {
    bookableId: 1,
    end: Moment().tz('America/New_York').add(2, 'hours').format('YYYY-MM-DDTHH:mm'),
    start: Moment().tz('America/New_York').add(1, 'hours').format('YYYY-MM-DDTHH:mm'),
  },
  submitSucceeded: hasSubmitSucceeded('booking')(state),
  submitting: isSubmitting('booking')(state),
})

const formed = reduxForm({ form: 'booking' })(BookingForm)

const connected = connect(
  mapStateToProps,
  // { createBooking: actionCreators.createBooking }
  { createBooking: actionCreators.postCreateBooking }
)(formed)

export default connected
