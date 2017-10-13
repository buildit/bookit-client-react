import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'

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

export const BookingForm: React.SFC<AllBookingFormProps> = (props) => {
  const { handleSubmit, createBooking } = props
  return (
    <form onSubmit={ handleSubmit((values) => {
      const booking = {
          ...values,
          endDateTime: new Date(values.endDateTime).toISOString(),
          startDateTime: new Date(values.startDateTime).toISOString(),
        }
      createBooking(booking)
      }) }>
      <div>
        <label>Name of Room</label>
        <Field name="bookableId" component="input" type="hidden" />
      </div>
      <div>
        <label htmlFor="subject">Subject</label>
        <Field name="subject" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="startDateTime">Start</label>
        <Field name="startDateTime" component="input" type="datetime-local" />
      </div>
      <div>
        <label htmlFor="endDateTime">End</label>
        <Field name="endDateTime" component="input" type="datetime-local" />
      </div>
      <Button type="submit">
        Book a Room!
      </Button>
    </form>
  )
}

const mapStateToProps = (state) => ({
  initialValues: {
    bookableId: 1,
    endDateTime: '2017-09-26T09:00:00.000-04:00',
    startDateTime: '2017-09-26T09:00:00.000-04:00',
    subject: 'My New Meeting',
  },
})

const form = reduxForm<BookingFormData>({ form: 'booking' })(BookingForm)

const connected = connect<{}, {}>(
  mapStateToProps,
  { createBooking }
)(form)

export default connected
