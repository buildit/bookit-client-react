import React from 'react'
import PropTypes from 'prop-types'

// import { formatTime } from 'Utils'
import TimeRange from './TimeRange'

import styles from 'Styles/booking-item.scss'

export const BaseBookingItem = ({ id, subject, start, end, bookableName }) => {
  return (
    <div className={styles.bookingItem} id={ `booking-${id}` }>
      {/*<p>{ formatTime(start) } - { formatTime(end) }</p>*/}
      <TimeRange start={start} end={end} />
      <p id={`booking-${subject.replace(/\s/g, '-').toLowerCase()}`}>{ subject }</p>
      <h3>{ bookableName }</h3>
    </div>
  )
}

BaseBookingItem.propTypes = {
  id: PropTypes.string,
  subject: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  bookableName: PropTypes.string,
}

export default BaseBookingItem
