import React from 'react'

import BookingForm from 'Containers/BookingForm'
import BookablesList from 'Containers/BookablesList'

/**
 * This React SFA exists to render the BookingForm
 */
export class BookingFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { bookablesVisible: false }
    this.setBookablesVisible = this.setBookablesVisible.bind(this)
  }

  setBookablesVisible(bool) {
    this.setState({
      bookablesVisible: bool,
    })
  }

  render() {
    return (
      <div>
        <BookingForm setBookablesVisible={this.setBookablesVisible} />
        {this.state.bookablesVisible && <BookablesList setBookablesVisible={this.setBookablesVisible} />}
      </div>
    )
  }
}

export default BookingFormContainer
