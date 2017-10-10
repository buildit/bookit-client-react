import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

import { RootAction } from 'Redux'

import {
  BOOKING_REQUEST,
  BOOKING_SUCCESS,
  BOOKING_FAILURE,
} from './'

export type State = {
  readonly bookingStatus: boolean
}

const bookingStatus = handleActions({
  [BOOKING_REQUEST]: () => false,
  [BOOKING_SUCCESS]: () => true,
  [BOOKING_FAILURE]: () => false,
}, false)

export const reducer = combineReducers<State>({
  bookingStatus,
})
