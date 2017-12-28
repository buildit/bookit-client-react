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
    const { payload: availability } = await this.props.getAvailability(this.props.start, this.props.end, this.props.location)
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
        <ActionLink onClick={this.handleBack} className={styles.back}>BACK</ActionLink>
        <h3 className={styles.heading}>Change Room</h3>
        { availability.map(bookable => (
          <BookableAvailabilityItem
            key={bookable.bookableId}
            className={styles.bookable}
            onClick={this.handleBookableClick}
            {...bookable}
          />)
        )}
      </div>
    )
  }
}

BookablesList.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
  change: PropTypes.func,
  getAvailability: PropTypes.func,
  setBookablesVisible: PropTypes.func,
  location: PropTypes.string,
}

const mapStateToProps = state => ({
  start: selectors.getBookingFormStart(state),
  end: selectors.getBookingFormEnd(state),
  location: selectors.getBookingFormLocation(state),
})

const mapDispatchToProps = {
  change,
  getAvailability: actionCreators.getAvailability,
}

export default connect(mapStateToProps, mapDispatchToProps)(BookablesList)
