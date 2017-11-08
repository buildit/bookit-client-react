import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { Field, reduxForm, isSubmitting, SubmissionError } from 'redux-form'

import Moment from 'moment-timezone'

import { actionCreators, selectors } from 'Redux'

import Button from 'Components/Button'

import { getIntervalInMinutes } from 'Utils'

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

const renderSuccessMessage = bookingId => <h1>Booking Created with booking ID {bookingId}!</h1>
const renderErrorMessages = errors => <h1>Booking Failed: {errors.map((error, index) => <p key={index}>{error}</p>)}</h1>

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export class BookingForm extends React.Component {
  componentDidMount() {
    // TODO: Use bookingIntervalTree (somehow) to find earliest free
    // slot for a bookable and set the result into `values` below.
    const values = {
      bookableId: 1,
      end: Moment().tz('America/New_York').add(2, 'hours').format('YYYY-MM-DDTHH:mm'),
      start: Moment().tz('America/New_York').add(1, 'hours').format('YYYY-MM-DDTHH:mm'),
    }
    this.props.initialize(values)
  }

  submitBookingForm = (values) => {
    return sleep(1000).then(() => {
      const { start, end } = values
      const [ low, high ] = getIntervalInMinutes(start, end)

      const overlaps = this.props.bookingIntervalTree.search(low, high)

      if (overlaps.length) {
        console.log('OVERLAPS:', overlaps)
        throw new SubmissionError({
          _error: 'Booking time overlaps with other booking!',
        })
      } else {
        this.props.createBooking(values)
      }
    })
  }

  render() {
    const {
      handleSubmit,
      submitting,
      bookingInstanceId,
      pristine,
      invalid,
      error,
      errorMessages,
      setBookablesVisible,
      bookableName,
    } = this.props


    return (
      <div className={styles.bookingForm}>
        <div className={styles.heading}>
          <h2 className={styles.title}>Book A Room</h2>
          <Link to="/" className={styles.cancel}>X</Link>
        </div>

        { error && <strong>{ error }</strong> }

        <form onSubmit={ handleSubmit(this.submitBookingForm) }>
          <Field name="start" component={ renderField } label="Start" type="text" validate={[required, startBeforeEnd]} />
          <Field name="end" component={ renderField } label="End" type="text" validate={[required, endAfterStart]} />
          <a href="#" onClick={(event) => {
            event.preventDefault()
            setBookablesVisible(true)}} className="roomsInput">Rooms</a>
          <Field name="bookableId" component={ renderField } type="hidden" label={bookableName || 'Pick a Room'} />
          <Field name="subject" component={ renderField } label="Event Name" type="text" validate={required} />
          <Button type="submit" disabled={ pristine || submitting || invalid } id="bookit" className={styles.submitButton}>
            BookIt
          </Button>
        </form>
        { bookingInstanceId && renderSuccessMessage(bookingInstanceId) }
        { errorMessages && renderErrorMessages(errorMessages) }
      </div>
    )
  }
}

BookingForm.propTypes = {
  handleSubmit: PropTypes.func,
  createBooking: PropTypes.func,
  submitting: PropTypes.bool,
  bookingInstanceId: PropTypes.number,
  initialize: PropTypes.func,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  errorMessages: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.string,
  setBookablesVisible: PropTypes.func,
  bookableName: PropTypes.string,
  bookingIntervalTree: PropTypes.object,
}

const mapStateToProps = state => ({
  bookingInstanceId: selectors.getBookingInstanceId(state),
  errorMessages: selectors.getErrorMessages(state),
  submitting: isSubmitting('booking')(state),
  bookableName: selectors.getBookingBookableName(state),
  bookingIntervalTree: selectors.getBookingIntervalTreeForDate(state, '2017-11-08'),
})

const formed = reduxForm({ form: 'booking' })(BookingForm)

export default connect(mapStateToProps, {
  createBooking: actionCreators.createBooking,
})(formed)
