import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { createPropsSelector } from 'reselect-immutable-helpers'

import WindowOpener from '../components/WindowOpener'

import { authenticationRedirectUrl, signinRequestUrl } from 'Utils'

import { actionCreators, selectors } from 'Redux'

export class LoginWindowOpener extends Component {
  constructor(props) {
    super(props)

    this.toggleLoginInProgress = this.toggleLoginInProgress.bind(this)

    this.handleWindowLoaded = this.handleWindowLoaded.bind(this)
    this.handleWindowUnloaded = this.handleWindowUnloaded.bind(this)

    this.pollWindowLocation = this.pollWindowLocation.bind(this)

    this.state = {
      loginInProgress: false,
      loginWindow: null,
      poller: null,
    }
  }

  static propTypes = {
    children: PropTypes.node,
    userEmail: PropTypes.string,
    loginRequest: PropTypes.func,
  }

  handleWindowLoaded(loginWindow) {
    this.setState({ loginWindow, poller: setInterval(this.pollWindowLocation, 1) })
  }

  handleWindowUnloaded() {
    const { poller } = this.state
    poller && clearInterval(poller)
    this.setState({ loginWindow: null, poller: null, loginInProgress: false })
  }

  pollWindowLocation() {
    const { loginWindow } = this.state
    const { loginRequest } = this.props

    if (!loginWindow || loginWindow.closed || loginWindow.closed === undefined) this.handleWindowUnloaded()

    try {
      if (loginWindow.location.href.indexOf(authenticationRedirectUrl()) != -1) {
        loginRequest(loginWindow.location.hash)
        this.handleWindowUnloaded()
      }
    } catch (error) {} // eslint-disable-line no-empty
  }

  toggleLoginInProgress() {
    const { loginInProgress } = this.state
    this.setState({ loginInProgress: !loginInProgress })
  }

  render() {
    const { loginInProgress } = this.state

    return (
      <div>
        { React.cloneElement(
          this.props.children,
          {
            onClick: this.toggleLoginInProgress,
            disabled: Boolean(this.state.loginWindow),
          }
        )}
        { loginInProgress &&
          <WindowOpener
            url={signinRequestUrl('login', this.props.userEmail)}
            options={{ width: 483, height: 600 }}
            onLoaded={this.handleWindowLoaded}
            onUnloaded={this.handleWindowUnloaded}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = createPropsSelector({
  userEmail: selectors.getUserEmail,
})

export default connect(mapStateToProps, { loginRequest: actionCreators.loginRequest })(LoginWindowOpener)
