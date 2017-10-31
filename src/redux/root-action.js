import { actionCreators as BookingActionCreators } from './booking'
import { actionCreators as ApiActionCreators } from './api'

export const actionCreators = {
  ...BookingActionCreators,
  ...ApiActionCreators,
}
