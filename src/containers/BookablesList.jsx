import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { change } from 'redux-form'

import { BookingSelectors } from 'Redux/booking'

import styles from 'Styles/list.scss'

export class BookablesList extends React.Component {

  render() {
    return (
      <div className={styles.bookablesList}>
        <a href="#" onClick={(event) => {
          event.preventDefault()
          this.props.setBookablesVisible(false)}}>BACK</a>
        {this.props.bookables && this.props.bookables.map((bookable) => {
          return (
            <div key={bookable.get('id')} className={styles.bookable}>
              <h3 onClick={(event) => {
                event.preventDefault()
                this.props.dispatch(change('booking', 'bookableId', bookable.get('id')))
                this.props.setBookablesVisible(false)
              }}>{bookable.get('name')} Room</h3>
            </div>
          )
        })}
      </div>
    )
  }
}

BookablesList.propTypes = {
  bookables: PropTypes.array,
  setBookablesVisible: PropTypes.func,
  dispatch: PropTypes.func,
}

const mapStateToProps = state => ({
  bookables: BookingSelectors.getBookableEntitiesForLocation(state),
})

const connected = connect(
  mapStateToProps
)(BookablesList)

export default connected
