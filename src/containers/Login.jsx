import React from 'react'

import { Link } from 'react-router-dom'

import Button from 'Components/Button'

import styles from 'Styles/login.scss'

export const Login = () => (
  <div className={styles.login}>
    <div className={styles.top}>
      <h1>BookIt</h1>
    </div>
    <div className={styles.bottom}>
      <Link to="/" className={styles.bigButton}>
        <Button>Sign in with Microsoft Credentials</Button>
      </Link>
    </div>
  </div>
)

export default Login
