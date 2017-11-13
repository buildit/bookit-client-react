import React from 'react'
import PropTypes from 'prop-types'

export const BookingItem = ({ id, subject, start, end, bookableName }) => {
  return (
    <div id={id} >
      <p>{start} - {end}</p>
      <p>{subject}</p>
      <h3>{bookableName}</h3>
    </div>
  )
}

BookingItem.propTypes = {
  id: PropTypes.number,
  subject: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  bookableName: PropTypes.string,
}

export default BookingItem
