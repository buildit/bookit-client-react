import React from 'react'
import PropTypes from 'prop-types'
//
import { connect } from 'react-redux'
//
// import { Link } from 'react-router-dom'
//
import { actionCreators } from 'Redux'
import { BookingSelectors } from 'Redux/booking'

export class BookablesList extends React.Component {
  componentDidMount() {
    this.props.getBookablesForLocation(1)
  }

  render() {
    return (
      <h1>HI</h1>
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
