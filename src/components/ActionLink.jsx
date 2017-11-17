import React from 'react'
import PropTypes from 'prop-types'

export const ActionLink = ({ children, onClick, id }) => (
  <a
    href="#"
    onClick={(event) => {
      event.preventDefault()
      onClick()
    }}
    id={id}
  >
    { children }
  </a>
)

ActionLink.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string,
}

export default ActionLink
