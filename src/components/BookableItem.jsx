import React from 'react'
import PropTypes from 'prop-types'

const clickHandler = (handler, value) => (event) => {
  event.preventDefault()
  handler(value)
}

export const BookableItem = ({ id, name, className, onClick, closed, booked }) => (
  <div className={className} onClick={clickHandler(onClick, id)}>
    <h3>{ name } Room</h3>
    <p>Open: {closed ? 'No' : 'Yes'}</p>
    <p>Booked: {booked ? 'Yes' : 'No'}</p>
  </div>
)

BookableItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  closed: PropTypes.bool,
  booked: PropTypes.bool,
}

export default BookableItem
