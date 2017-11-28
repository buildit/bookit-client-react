import { actionCreators as ApiActionCreators } from './api'
import { actionCreators as AuthActionCreators } from './auth'

export const actionCreators = {
  ...ApiActionCreators,
  ...AuthActionCreators,
}
