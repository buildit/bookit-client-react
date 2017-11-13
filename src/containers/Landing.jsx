import React from 'react'

import { Link } from 'react-router-dom'

import Button from 'Components/Button'

import styles from 'Styles/landing.scss'

export const Landing = () => (
  <div className={styles.landing}>
    <div className={[styles.landingRow, styles.landingRowPadded].join(' ')}>
      <Link to="/book">
        <Button className={styles.bigButton}>Book A Room</Button>
      </Link>
      <Link to="/bookings">
        <Button className={styles.bigButton}>View Your Bookings</Button>
      </Link>
    </div>
  </div>
)

export default Landing
