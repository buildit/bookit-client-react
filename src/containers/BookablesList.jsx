import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { change } from 'redux-form'

import { selectors, actionCreators } from 'Redux'

import ActionLink from 'Components/ActionLink'
import BookableAvailabilityItem from 'Components/BookableAvailabilityItem'

import styles from 'Styles/list.scss'

export class BookablesList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      availability: [],
    }
  }

  async componentDidMount() {
    const { getAvailability, dates: { start, end }, location } = this.props
    const { payload: availability } = await getAvailability(start, end, location)
    this.setState({ availability })
  }

  handleBack = () => {
    this.props.setBookablesVisible(false)
  }

  handleBookableClick = (bookableId) => {
    this.props.change('booking', 'bookableId', bookableId)
    this.handleBack()
  }

  render() {
    const { availability } = this.state

    return (
      <div className={styles.bookablesList}>
        <div className={styles.bookablesHeader}>
          <ActionLink onClick={this.handleBack} className={styles.back}>BACK</ActionLink>
          <h3 className={styles.heading}>Select Room</h3>
        </div>
        <div className={styles.bookablecontainer}>
          { availability.map(bookable => (
            <BookableAvailabilityItem
              key={bookable.bookableId}
              className={styles.bookable}
              onClick={this.handleBookableClick}
              {...bookable}
            />)
          )}
        </div>
      </div>
    )
  }
}

BookablesList.propTypes = {
  dates: PropTypes.object,
  change: PropTypes.func,
  getAvailability: PropTypes.func,
  setBookablesVisible: PropTypes.func,
  location: PropTypes.string,
}

const mapStateToProps = state => ({
  dates: selectors.getBookingFormDateRange(state),
  location: selectors.getBookingFormLocation(state),
})

const mapDispatchToProps = {
  getAvailability: actionCreators.getAvailability,
  change,
}

export default connect(mapStateToProps, mapDispatchToProps)(BookablesList)
