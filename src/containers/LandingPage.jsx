import React from 'react'

// import { Link } from 'react-router-dom'

// import Button from 'Components/Button'
// import IconCheckmark from 'Components/IconCheckmark'

// import styles from 'Styles/landing.scss'

// export const LandingPage = () => (
//   <div className={styles.landing}>
//     <div className={[styles.landingRow, styles.landingRowPadded].join(' ')}>
//       <IconCheckmark />
//     </div>
//     <div className={[styles.landingRow, styles.landingRowPadded].join(' ')}>
//       <Link to="/book">
//         <Button className={styles.bigButton}>Book A Room</Button>
//       </Link>
//       <Link to="/bookings">
//         <Button className={styles.bigButton}>View Your Bookings</Button>
//       </Link>
//     </div>
//   </div>
// )

import styles from 'Styles/layout.scss'

const Container = ({ children }) => <div className={styles.container}>{ children }</div>
const Header = ({ children }) => <header className={styles.header}>{ children }</header>
const Main = ({ children }) => <main className={styles.main}>{ children }</main>
const Row = ({ children }) => <div>{ children }</div>

const LandingPage = () => (
  <Container>
    <Header>
      <Row>Book A Room</Row>
      <Row>
        <p>Your next meeting is in 15 minutes in the Red Room.</p>
        <button>View Your Bookings</button>
      </Row>
      <Row>
        <p>I need a room right now for:</p>
        <p>1 Hour</p>
      </Row>
    </Header>
    <Main>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
      <p>Hallo</p>
    </Main>
  </Container>
)

export default LandingPage
