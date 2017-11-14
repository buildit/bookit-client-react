import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { change } from 'redux-form'

import { selectors } from 'Redux'

import withBookable from 'Hoc/with-bookable'
import { BaseBookableItem } from 'Components/BaseBookableItem'

import styles from 'Styles/list.scss'


const SelectBookableItem = withBookable(BaseBookableItem)

export class BookablesList extends React.Component {

  handleBack = (event) => {
    event && event.preventDefault()
    this.props.setBookablesVisible(false)
  }

  handleBookableClick = (bookableId) => {
    this.props.dispatch(change('booking', 'bookableId', bookableId))
    this.handleBack()
  }

  render() {
    const { bookableIds } = this.props

    return (
      <div className={styles.bookablesList}>
        <a href="#" onClick={this.handleBack}>BACK</a>
        { bookableIds.map(
          id => <SelectBookableItem key={id} id={id} className={styles.bookable} onClick={this.handleBookableClick} />
        )}
      </div>
    )
  }
}

BookablesList.propTypes = {
  bookableIds: PropTypes.array,
  setBookablesVisible: PropTypes.func,
  dispatch: PropTypes.func,
}

const mapStateToProps = state => ({
  bookableIds: selectors.getBookablesForLocation(state, 1),  // Cheating on the locationId a bit
})

export default connect(mapStateToProps)(BookablesList)
