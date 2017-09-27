import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { pingRequest } from 'Actions'

import Button from './Button'

const mapStateToProps = (state, ownProps) => ({ ...state, ...ownProps })
const mapDispatchToProps = dispatch => bindActionCreators({ onClick: pingRequest }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Button)
