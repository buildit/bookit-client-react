import React from 'react'
import PropTypes from 'prop-types'

const BookableAvailabilityItem = ({ bookableId, name, closed, reason, onClick, ...props }) => (
  <div onClick={() => !closed && onClick(bookableId) } { ...props }>
    <h2>{ name }</h2>
    { closed && <p>{ reason }</p> }
  </div>
)

BookableAvailabilityItem.propTypes = {
  bookableId: PropTypes.string,
  name: PropTypes.string,
  closed: PropTypes.bool,
  reason: PropTypes.string,
  onClick: PropTypes.func,
}

export default BookableAvailabilityItem
