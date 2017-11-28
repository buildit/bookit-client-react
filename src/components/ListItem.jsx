import React from 'react'
import PropTypes from 'prop-types'

import cn from 'classnames'

import styles from 'Styles/list-item.scss'

const ListItem = ({ booked }) => (
  <div className={cn({ [styles.listItemWrapper]: true, [styles.listItemBooked]: booked })}>
    <div className={styles.listItemItem}>
      <div>
        <p className={styles.listItemTitle}>White Room</p>
        <ul className={styles.listItemFeatures}>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 15 17">
              <path fill="none" fillRule="evenodd" stroke="#2F2B2C" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".6" d="M11.052 10.105a.37.37 0 0 0-.506-.071s-1.16.874-1.237.928a.22.22 0 0 1-.062.034c-1.145.407-4.533-4.185-3.696-4.868l1.242-.937a.36.36 0 0 0 .067-.507L3.676.584a.368.368 0 0 0-.513-.068c-2.036 1.539-5.17 2.953.802 10.646 5.893 7.593 8.135 5.265 10.233 3.523a.359.359 0 0 0 .054-.498l-3.2-4.082z"/>
            </svg>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="17" viewBox="0 0 15 17">
              <path fill="none" fillRule="evenodd" stroke="#2F2B2C" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".6" d="M11.052 10.105a.37.37 0 0 0-.506-.071s-1.16.874-1.237.928a.22.22 0 0 1-.062.034c-1.145.407-4.533-4.185-3.696-4.868l1.242-.937a.36.36 0 0 0 .067-.507L3.676.584a.368.368 0 0 0-.513-.068c-2.036 1.539-5.17 2.953.802 10.646 5.893 7.593 8.135 5.265 10.233 3.523a.359.359 0 0 0 .054-.498l-3.2-4.082z"/>
            </svg>
          </li>
        </ul>
      </div>
      <p>Free until 4:30PM</p>
    </div>
  </div>
)

ListItem.propTypes = {
  booked: PropTypes.bool,
}

export default ListItem
