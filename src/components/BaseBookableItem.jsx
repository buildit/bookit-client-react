import React from 'react'
import PropTypes from 'prop-types'

const clickHandler = (handler, value) => (event) => {
  event.preventDefault()
  handler(value)
}

export const BaseBookableItem = ({ id, name, className, onClick, booked, closed }) => {
  return (
    <div id={id} className={className} onClick={ (!closed && !booked) ? clickHandler(onClick, id) : null }>
      <h3>{ name }</h3>
      <p>Available: {(closed || booked) ? 'No' : 'Yes'}</p>
    </div>
  )
}

// <BaseBookableItem>
//  <ClosedReason bookable={bookable} />
//   <OverlapsReason booking={booking} />
// </BaseBookableItem>

BaseBookableItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  booked: PropTypes.bool,
  closed: PropTypes.bool,
}

export default BaseBookableItem
