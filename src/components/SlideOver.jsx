import React from 'react'
import PropTypes from 'prop-types'

import { CSSTransition } from 'react-transition-group'

import styles from 'Styles/slide.scss'

const slideClassNames = {
  appear: styles.slideAppear,
  appearActive: styles.slideAppearActive,
  enter: styles.slideEnter,
  enterActive: styles.slideEnterActive,
  exit: styles.slideExit,
  exitActive: styles.slideExitActive,
}

const SlideOver = ({ children, ...props }) => (
  <CSSTransition
    { ...props }
    classNames={slideClassNames}
    timeout={1000}
  >
    { children }
  </CSSTransition>
)

SlideOver.propTypes = {
  children: PropTypes.node,
}

export default SlideOver
