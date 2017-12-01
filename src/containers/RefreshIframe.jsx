import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { createPropsSelector } from 'reselect-immutable-helpers'

import { authenticationRedirectUrl, refreshRequestUrl } from 'Utils'

import { actionCreators, selectors } from 'Redux'

import Iframe from 'Components/Iframe'

const iframeStyles = { visibility: 'hidden' }

export class RefreshAuthenticationIframe extends Component {
  static propTypes = {
    isRefreshingAuthentication: PropTypes.bool,
    authenticationComplete: PropTypes.func,
    userEmail: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this.handleIframeLoad = this.handleIframeLoad.bind(this)
    this.pollIframeLocation = this.pollIframeLocation.bind(this)

    // this.poller = setInterval(this.pollIframeLocation, 1)
  }

  handleIframeLoad() {
    const refreshIframe = this.iframeRef

    const loadHandler = () => {
      if (this.poller) clearInterval(this.poller)
      this.poller = setInterval(this.pollIframeLocation, 1)
    }

    refreshIframe.contentWindow.onload = () => loadHandler()
    refreshIframe.contentDocument.readyState === 'complete' && loadHandler()
  }

  pollIframeLocation() {
    const refreshIframe = this.iframeRef
    const { authenticationComplete } = this.props

    try {
      const iwindow = refreshIframe.contentWindow

      if (iwindow.location.href.indexOf(authenticationRedirectUrl()) != -1) {
        clearInterval(this.poller)
        authenticationComplete(iwindow.location.hash)
      }
    } catch (error) {}  // eslint-disable-line
  }

  componentDidMount() {
    if (this.props.isRefreshingAuthentication) {
      this.poller = setInterval(this.pollIframeLocation, 1)
    }

    if (this.iframeRef && this.iframeRef.contentWindow) {
      this.handleIframeLoad()
    }
  }

  componentWillUnmount() {
    if (this.poller) clearInterval(this.poller)
  }

  render() {
    return (
      this.props.isRefreshingAuthentication &&
      <Iframe
        url={refreshRequestUrl(this.props.userEmail)}
        iframeRef={el => this.iframeRef = el}
        width="0"
        height="0"
        styles={iframeStyles}
      />
    )
  }
}

// export default Refresh

const mapStateToProps = createPropsSelector({
  isRefreshingAuthentication: selectors.isRefreshingAuthentication,
  userEmail: selectors.getUserEmail,
})

const enhance = connect(mapStateToProps, { authenticationComplete: actionCreators.authenticationComplete })

export default enhance(RefreshAuthenticationIframe)
