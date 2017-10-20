import { RouterAction, LocationChangeAction } from 'react-router-redux'

import { actionCreators as BookingActionCreators, Actions as BookingActions } from './booking'
import { actionCreators as ApiActionCreators } from './api'

type ReactRouterAction = RouterAction | LocationChangeAction

export type RootAction =
  | ReactRouterAction
  | BookingActions[keyof BookingActions]

export const actionCreators = {
  ...BookingActionCreators,
  ...ApiActionCreators,
}
