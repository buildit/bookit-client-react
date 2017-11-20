import React from 'react'
import PropTypes from 'prop-types'

const handleClick = onClick => (event) => {
  event.preventDefault()
  onClick()
}

export const ActionLink = ({ children, onClick, ...props }) => (
  <a href="#" { ...props } onClick={handleClick(onClick)}>
    { children }
  </a>
)

ActionLink.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ActionLink
