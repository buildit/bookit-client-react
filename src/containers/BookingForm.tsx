import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, InjectedFormProps, hasSubmitSucceeded, isSubmitting } from 'redux-form'

import Moment from 'moment'

import Button from 'Components/Button'
import { createBooking } from 'Redux/api'
import { BookingSelectors } from 'Redux/booking'

interface BookingFormData {
  bookableId: number
  subject: string
  start: string
  end: string
}

interface BookingFormProps {
  submitSucceeded: any
  createBooking: any
  bookingInstance: any
  initialValues: any
}

type AllBookingFormProps = BookingFormProps & InjectedFormProps<BookingFormData>

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
  const { handleSubmit, createBooking, submitting, bookingInstance } = props
  const handleCreateBooking = (values) => {
    createBooking({
      ...values,
      end: Moment(values.end).toISOString(),
      start: Moment(values.start).toISOString(),
    })
  }

  return (
    <div>
      <form onSubmit={ handleSubmit(handleCreateBooking) }>
        <Field name="bookableId" component={renderField} type="hidden" label="Name of Room" />
        <Field name="subject" component={renderField} label="Subject" type="text" />
        <Field name="start" component={renderField} label="Start" type="text" />
        <Field name="end" component={renderField} label="End" type="text" />
        <Button type="submit" disabled={submitting} id="bookit">
          Book a Room!
        </Button>
      </form>
      {bookingInstance && renderSuccessMessage(bookingInstance.bookingId)}
    </div>
  )
}

const mapStateToProps = (state) => ({
  bookingInstance: BookingSelectors.getBookingInstance(state),
  initialValues: {
    bookableId: 1,
    end: Moment().add(2, 'hours').format('YYYY-MM-DDTHH:mm'),
    start: Moment().add(1, 'hours').format('YYYY-MM-DDTHH:mm'),
    subject: 'My New Meeting',
  },
  submitSucceeded: hasSubmitSucceeded('booking')(state),
  submitting: isSubmitting('booking')(state),
})

const form = reduxForm<BookingFormData>({ form: 'booking' })(BookingForm)

const connected = connect<{}, {}>(
  mapStateToProps,
  { createBooking }
)(form)

export default connected
