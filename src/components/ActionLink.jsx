import React from 'react'
import PropTypes from 'prop-types'

export const ActionLink = ({ onClick, children, ...props }) => (
  <a
    href="#"
    onClick={(event) => {
      event.preventDefault()
      onClick()
    }}
    { ...props }
  >
    { children }
  </a>
)

ActionLink.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default ActionLink
