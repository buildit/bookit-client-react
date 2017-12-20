import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { toast } from 'react-toastify'

import { actionCreators, selectors } from 'Redux'

export default toastType => (WrappedComponent) => {
  class ToastWrapper extends React.Component {
    static propTypes = {
      toasts: PropTypes.string,
      clearToasts: PropTypes.func,
    }

    constructor(props) {
      super(props)
      this.toastId = null
    }

    componentDidMount() {
      this.toastify()
    }

    componentDidUpdate(prevProps) {
      if (prevProps.toasts !== this.props.toasts) {
        this.toastify()
      }
    }

    toastify = () => {
      if (!toast.isActive(this.toastId) && Boolean(this.props.toasts)) {
        this.toastId = toast(this.props.toasts, {
          onClose: () => this.props.clearToasts(),
          type: toastType,
        })
      }
    }

    render() {
      const { toasts, clearToasts, ...props } = this.props  // eslint-disable-line
      return <WrappedComponent {...props} />
    }
  }

  /* istanbul ignore next */
  const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component'

  ToastWrapper.displayName = `Toasted(${getDisplayName(WrappedComponent)})`

  const mapStateToProps = state => ({
    toasts: selectors.getToasts(state),
  })

  const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
  })

  const mapDispatchToProps = { clearToasts: actionCreators.clearToasts }

  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(ToastWrapper)
}


