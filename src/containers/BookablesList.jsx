import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { change } from 'redux-form'

import { selectors, actionCreators } from 'Redux'

import ActionLink from 'Components/ActionLink'
import BaseBookableItem from 'Components/BaseBookableItem'

import withBookable from 'Hoc/with-bookable'

import styles from 'Styles/list.scss'

const SelectBookableItem = withBookable(BaseBookableItem)

export class BookablesList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      overlaps: [],
    }
  }

  async componentDidMount() {
    console.log('COMPONENT DID MOUNT')
    const { payload: availability } = await this.props.getAvailability(this.props.start)
    const overlaps = availability.search(this.props.start, this.props.end)
    console.log('OVERLAPS!', overlaps)
    this.setState({ overlaps: overlaps.map(overlap => overlap.bookable) })
  }

  handleBack = () => {
    this.props.setBookablesVisible(false)
  }

  handleBookableClick = (bookableId) => {
    this.props.change('booking', 'bookableId', bookableId)
    this.handleBack()
  }

  render() {
    const { bookableIds } = this.props
    const { overlaps } = this.state

    const sortedBookableIds = bookableIds.reduce((acc, id) => {
      if (!overlaps.includes(id))
        acc.push(id)
      return acc
    }, []).concat(overlaps)

    return (
      <div className={styles.bookablesList}>
        <ActionLink onClick={this.handleBack}>BACK</ActionLink>
        <h3 className={styles.heading}>Change Room</h3>
        { sortedBookableIds.map(id => (
          <SelectBookableItem
            key={id}
            id={id}
            className={styles.bookable}
            onClick={this.handleBookableClick}
            booked={overlaps.includes(id)}
          />)
        )}
      </div>
    )
  }
}

BookablesList.propTypes = {
  bookableIds: PropTypes.array,
  start: PropTypes.string,
  end: PropTypes.string,
  change: PropTypes.func,
  getAvailability: PropTypes.func,
  setBookablesVisible: PropTypes.func,
  dispatch: PropTypes.func,
}

const mapStateToProps = state => ({
  bookableIds: selectors.getBookablesForLocation(state),  // selectors.getBookablesSortedByAvailability(state),
  start: selectors.getBookingFormStart(state),
  end: selectors.getBookingFormEnd(state),
})

const mapDispatchToProps = {
  change,
  getAvailability: actionCreators.getAvailability,
}

export default connect(mapStateToProps, mapDispatchToProps)(BookablesList)
