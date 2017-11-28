import React from 'react'
import PropTypes from 'prop-types'

import cn from 'classnames'

import styles from 'Styles/header.scss'

const HeaderBack = ({ title }) => (
  <div className={styles.headerWrapper}>
    <div className={styles.headerItem}>
      <p className={styles.headerItemTitle}>{ title }</p>
      <a href="#" className={cn(styles.headerItemAction, styles.headerItemActionBack)}>
        {/*
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <path className="back-left-chevron" fill="none" d="M26,26 L52,52 M26,26 L52,0" />
        </svg>
        */}
        <svg className={styles.headerIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.422 7.406l-4.594 4.594 4.594 4.594-1.406 1.406-6-6 6-6z"/>
        </svg>
      </a>
    </div>
  </div>
)

HeaderBack.propTypes = {
  title: PropTypes.string,
}

export default HeaderBack
