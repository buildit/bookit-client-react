import React from 'react'
import PropTypes from 'prop-types'

import styles from 'Styles/checkmark.scss'

const IconCheckmark = ({ height = 128, width = 128 }) => (
  <svg className={styles.checkmark} style={{ height, width }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
    <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/>
    <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
  </svg>
)

// The following is an "X" - not very good, noticeably larger than
// the checkmark, but still, getting there
/*
<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 52 52">
  <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/>
  <path class="close-x" d="M 13,13 L 39,39 M 39,13 L 13,39" />
</svg>
*/

// .close-x {
//   stroke: black;
//   fill: transparent;
//   stroke-linecap: square;
//   stroke-width: 5;
// }

IconCheckmark.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
}

export default IconCheckmark
