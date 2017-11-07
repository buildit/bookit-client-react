import React from 'react'

import { Link } from 'react-router-dom'

import Button from 'Components/Button'

import styles from 'Styles/landing.scss'

// #f3f0f0

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
    {/*
    <div className={styles.landingRow}>
      <p>Hello thar!</p>
    </div>
    */}
  </div>
)

export default Landing
