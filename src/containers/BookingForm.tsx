import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, InjectedFormProps, hasSubmitSucceeded, isSubmitting, } from 'redux-form'
import Moment from 'moment'

import Button from 'Components/Button'
import { createBooking } from 'Redux/api'

interface BookingFormData {
  bookableId: number,
  subject: string,
  startDateTime: string,
  endDateTime: string,
}

interface BookingFormProps {
  createBooking: any,
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

export const BookingForm: React.SFC<AllBookingFormProps> = (props) => {
  const { handleSubmit, createBooking, submitSucceeded, submitting } = props

  const handleCreateBooking = (values) => {
    createBooking({
      ...values,
      endDateTime: Moment(values.endDateTime).toISOString(),
      startDateTime: Moment(values.startDateTime).toISOString(),
    })
  }

  return (
    <div>
      <form onSubmit={ handleSubmit(handleCreateBooking) }>
        <Field name="bookableId" component={renderField} type="hidden" label="Name of Room" />
        <Field name="subject" component={renderField} label="Subject" type="text" />
        <Field name="startDateTime" component={renderField} label="Start" type="text" />
        <Field name="endDateTime" component={renderField} label="End" type="text" />
        <Button type="submit" disabled={submitting}>
          Book a Room!
        </Button>
      </form>
      {submitSucceeded && <h1>Booking Created!</h1>}
    </div>
  )
}

const mapStateToProps = (state) => ({
  initialValues: {
    bookableId: 1,
    endDateTime: Moment().add(1, 'hours').format('YYYY-MM-DDTHH:mm'),
    startDateTime: Moment().format('YYYY-MM-DDTHH:mm'),
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
