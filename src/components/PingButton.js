import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { pingRequest } from 'Actions'
import { getPingStatus, getRequestInProgress } from 'Selectors'

import Button from './Button'

// NOTE: This is note a great example of composing a component with connect and a base component, but oh wellz.
export class PingButton extends Component {
  static propTypes = {
    pingRequest: PropTypes.func,
    pingStatus: PropTypes.bool,
    requestInProgress: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    this.props.pingRequest()
  }

  render() {
    return (
      <div>
        <Button id="bookit" disabled={this.props.requestInProgress} onClick={this.handleClick}>
          Ping Server
        </Button>
        { this.props.pingStatus && <span>SERVER IS ALIVE!</span> }
      </div>
    )
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  pingStatus: getPingStatus(state),
  requestInProgress: getRequestInProgress(state),
})

export default connect(mapStateToProps, { pingRequest })(PingButton)
