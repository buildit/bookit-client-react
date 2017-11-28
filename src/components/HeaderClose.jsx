import React from 'react'
import PropTypes from 'prop-types'

import styles from 'Styles/header.scss'

const HeaderClose = ({ title }) => (
  <div className={styles.headerWrapper}>
    <div className={styles.headerItem}>
      <p className={styles.headerItemTitle}>{ title }</p>
      <a href="#" className={styles.headerItemAction}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </a>
    </div>
  </div>
)

HeaderClose.propTypes = {
  title: PropTypes.string,
}

export default HeaderClose
