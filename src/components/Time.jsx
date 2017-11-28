import React from 'react'
import PropTypes from 'prop-types'

import { formatTime } from 'Utils'

const Time = ({ value }) => <time>{ formatTime(value) }</time>

Time.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
}

export default Time
