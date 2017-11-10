import React from 'react'
import PropTypes from 'prop-types'

const clickHandler = (handler, value) => (event) => {
  event.preventDefault()
  handler(value)
}

export const BookableItem = ({ id, name, className, onClick, closed, booked }) => {
  const available = !closed && !booked
  return (
    <div id={id} className={className} onClick={available ? clickHandler(onClick, id) : null}>
      <h3>{ name } Room</h3>
      <p>Available: {available ? 'Yes' : 'No'}</p>
    </div>
  )
}

BookableItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  closed: PropTypes.bool,
  booked: PropTypes.bool,
}

export default BookableItem
