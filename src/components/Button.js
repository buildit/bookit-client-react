import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, ...props }) => (
  <button { ...props } type="button">{ children }</button>
)

Button.propTypes = {
  children: PropTypes.any,
}

export default Button
