import React from 'react'
import PropTypes from 'prop-types'

export const ActionLink = ({ children, onClick }) => (
  <a
    href="#"
    onClick={(event) => {
      event.preventDefault()
      onClick()
    }}
  >
    { children }
  </a>
)

ActionLink.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ActionLink
