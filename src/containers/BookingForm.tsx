import React from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm, InjectedFormProps, hasSubmitSucceeded, isSubmitting } from 'redux-form'

import Moment from 'moment'

import { actionCreators } from 'Redux'
import { BookingSelectors } from 'Redux/booking'

import Button from 'Components/Button'

interface BookingFormData {
  bookableId: number
  subject: string
  start: string
  end: string
}

interface BookingFormProps {
  submitSucceeded: any
  createBooking: any
  bookingInstanceId: any
  initialValues: any
}

type AllBookingFormProps = BookingFormProps & InjectedFormProps<BookingFormData>

const required = (value) => (value ? undefined : 'Required')

const endAfterStart = (value, {start}) => {
  try {
    if (Moment(value).isBefore(start)) {
      return 'End must be after start'
    }
  }
  catch (error) { } // tslint:disable-line
}

const startBeforeEnd = (value, {end}) => {
  try {
    if (Moment(value).isAfter(end)) {
      return 'Start must be before end'
    }
  }
  catch (error) { } // tslint:disable-line  
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
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

const renderSuccessMessage = (bookingId) => <h1>Booking Created with booking ID {bookingId}!</h1>

export const BookingForm: React.SFC<AllBookingFormProps> = (props) => {
  const { handleSubmit, createBooking, submitting, bookingInstanceId, pristine, invalid } = props

  return (
    <div>
      <form onSubmit={ handleSubmit(createBooking) }>
        <Field name="bookableId" component={ renderField } type="hidden" label="Name of Room" />
        <Field name="subject" component={ renderField } label="My Booking" type="text" validate={required} />
        <Field name="start" component={ renderField } label="Start" type="text" validate={[required, startBeforeEnd]} />
        <Field name="end" component={ renderField } label="End" type="text" validate={[required, endAfterStart]} />
        <Button type="submit" disabled={ pristine || submitting || invalid } id="bookit">
          Book a Room!
        </Button>
      </form>
      { bookingInstanceId && renderSuccessMessage(bookingInstanceId) }
    </div>
  )
}

const mapStateToProps = (state) => ({
  bookingInstanceId: BookingSelectors.getBookingInstanceId(state),
  initialValues: {
    bookableId: 1,
    end: Moment().add(1, 'hours').format('YYYY-MM-DDTHH:mm'),
    start: Moment().format('YYYY-MM-DDTHH:mm'),
  },
  submitSucceeded: hasSubmitSucceeded('booking')(state),
  submitting: isSubmitting('booking')(state),
})

const formed = reduxForm<BookingFormData>({ form: 'booking' })(BookingForm)

const connected = connect<{}, {}>(
  mapStateToProps,
  { createBooking: actionCreators.createBooking }
)(formed)

export default connected
