import React from 'react'
import PropTypes from 'prop-types'

const clickHandler = (handler, value) => (event) => {
  event.preventDefault()
  handler(value)
}

export const BaseBookableItem = ({ id, name, className, onClick, available }) => {
  return (
    <div id={id} className={className} onClick={available ? clickHandler(onClick, id) : null}>
      <h3>{ name }</h3>
      <p>Available: {available ? 'Yes' : 'No'}</p>
    </div>
  )
}

BaseBookableItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  available: PropTypes.bool,
}

export default BaseBookableItem
