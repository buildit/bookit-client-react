import React from 'react'
import PropTypes from 'prop-types'

import styles from 'Styles/bookable-item.scss'

const clickHandler = (handler, value) => (event) => {
  event.preventDefault()
  handler(value)
}

export const BaseBookableItem = ({ id, name, className, onClick, booked, closed, reason }) => {
  return (
    <div id={id} className={className} onClick={ (!closed && !booked) ? clickHandler(onClick, id) : null }>
      <h3>{ name }</h3>
      <p>Available: {(closed || booked) ? 'No' : 'Yes'}</p>
      <p className={styles.reason}>{closed ? reason : '' }</p>
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
  reason: PropTypes.string,
}

export default BaseBookableItem
