import React from 'react'
import PropTypes from 'prop-types'
//
import { connect } from 'react-redux'
//
import { Link } from 'react-router-dom'
//
import { actionCreators } from 'Redux'
import { BookingSelectors } from 'Redux/booking'

import styles from 'Styles/list.scss'

export class BookablesList extends React.Component {
  componentDidMount() {
    this.props.getBookablesForLocation(1)
  }

  render() {
    return (
      <div className={styles.bookablesList}>
        <Link to="/book">BACK</Link>
        {this.props.bookables && this.props.bookables.map((bookable) => {
          return (
            <div key={bookable.id}>
              <h3>{bookable.name} Room</h3>
            </div>
          )
        })}
      </div>
    )
  }
}

BookablesList.propTypes = {
  bookables: PropTypes.array,
  getBookablesForLocation: PropTypes.func,
}

const mapStateToProps = state => ({
  bookables: BookingSelectors.getBookablesForLocation(state),
})

const connected = connect(
  mapStateToProps,
  {
    getBookablesForLocation: actionCreators.getBookablesForLocation,
  }
)(BookablesList)

export default connected
