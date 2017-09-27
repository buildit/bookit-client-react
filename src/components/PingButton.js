import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { pingRequest } from 'Actions'
import { getPingStatus, getRequestInProgress } from 'Selectors'

import Button from './Button'

class PingButton extends Component {
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
        <Button disabled={this.props.requestInProgress} onClick={this.handleClick}>
          Ping Server
        </Button>
        { this.props.pingStatus && <span>SERVER IS ALIVE!</span> }
      </div>
    )
  }
}


const mapStateToProps = state => ({
  pingStatus: getPingStatus(state),
  requestInProgress: getRequestInProgress(state),
})
// const mapStateToProps = (state, ownProps) => ({ ...state, ...ownProps })

export default connect(mapStateToProps, { pingRequest })(PingButton)
