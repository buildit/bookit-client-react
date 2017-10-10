import { RouterAction, LocationChangeAction } from 'react-router-redux'

import { Actions as BookingActions } from './booking'

type ReactRouterAction = RouterAction | LocationChangeAction

export type RootAction =
  | ReactRouterAction
  | BookingActions[keyof BookingActions]
