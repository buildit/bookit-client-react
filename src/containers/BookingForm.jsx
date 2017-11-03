import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { Field, reduxForm, isSubmitting } from 'redux-form'

import Moment from 'moment-timezone'

import { actionCreators } from 'Redux'
import { BookingSelectors } from 'Redux/booking'
import { ErrorSelectors } from 'Redux/error'

import Button from 'Components/Button'

import styles from 'Styles/form.scss'

const required = value => (value ? undefined : 'Required')

const endAfterStart = (value, {start}) => {
  try {
    if (Moment(value).isBefore(start)) {
      return 'End must be after start'
    }
  }
  catch (error) { } // eslint-disable-line
}

const startBeforeEnd = (value, {end}) => {
  try {
    if (Moment(value).isAfter(end)) {
      return 'Start must be before end'
    }
  }
  catch (error) { } // eslint-disable-line
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span className={styles.errorSpan}>{error}</span>) ||
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

const renderSuccessMessage = bookingId => <h1 name="result">Booking Created with booking ID {bookingId}!</h1>
const renderErrorMessage = msg => <h1 name="error">Booking Failed: {msg}!</h1>

export class BookingForm extends React.Component {
  componentDidMount() {
    const values = {
      bookableId: 1,
      end: Moment().tz('America/New_York').add(2, 'hours').format('YYYY-MM-DDTHH:mm'),
      start: Moment().tz('America/New_York').add(1, 'hours').format('YYYY-MM-DDTHH:mm'),
    }
    this.props.initialize(values)
    this.props.getBookablesForLocation(1)
  }

  render() {
    const { handleSubmit, createBooking, submitting, bookingInstanceId, pristine, invalid, errorMessage } = this.props

    return (
      <div className={styles.bookingForm}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Book A Room</h2>
          <Link to="/" className={styles.cancel}>X</Link>
        </div>
        <form onSubmit={ handleSubmit(createBooking) }>
          <Field name="start" component={ renderField } label="Start" type="text" validate={[required, startBeforeEnd]} />
          <Field name="end" component={ renderField } label="End" type="text" validate={[required, endAfterStart]} />
          <Field name="bookableId" component={ renderField } type="hidden" label="Name of Room" />
          <Field name="subject" component={ renderField } label="Event Name" type="text" validate={required} />
          <Button type="submit" disabled={ pristine || submitting || invalid } id="bookit" className={styles.submitButton}>
            BookIt
          </Button>
        </form>
        { bookingInstanceId && renderSuccessMessage(bookingInstanceId) }
        { errorMessage && renderErrorMessage(errorMessage) }
      </div>
    )
  }
}

BookingForm.propTypes = {
  handleSubmit: PropTypes.func,
  createBooking: PropTypes.func,
  getBookablesForLocation: PropTypes.func,
  submitting: PropTypes.bool,
  bookingInstanceId: PropTypes.number,
  initialize: PropTypes.func,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  errorMessage: PropTypes.string,
}

const mapStateToProps = state => ({
  bookingInstanceId: BookingSelectors.getBookingInstanceId(state),
  errorMessage: ErrorSelectors.getErrorMessage(state),
  submitting: isSubmitting('booking')(state),
})

const formed = reduxForm({ form: 'booking' })(BookingForm)

const connected = connect(
  mapStateToProps,
  {
    createBooking: actionCreators.createBooking,
    getBookablesForLocation: actionCreators.getBookablesForLocation,
  }
)(formed)

export default connected
