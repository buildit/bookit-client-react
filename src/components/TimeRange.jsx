import React from 'react'

import Time from './Time'

const TimeRange = ({ start, end }) => (
  <div>
    <Time value={start} />
    { ' - ' }
    <Time value={end} />
  </div>
)

TimeRange.propTypes = {
  start: Time.propTypes.value,
  end: Time.propTypes.value,
}

export default TimeRange
