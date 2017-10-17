import { combineReducers } from 'redux'
import { handleAction, handleActions } from 'redux-actions'

import { Booking } from 'Models'

import {
  BOOKING_REQUEST,
  BOOKING_SUCCESS,
  BOOKING_FAILURE,
} from './'

export type State = {
  bookingStatus: boolean
  bookingInstance?: Booking
}

const bookingStatus = handleActions<boolean, boolean>({
  [BOOKING_REQUEST]: () => false,
  [BOOKING_SUCCESS]: () => true,
  [BOOKING_FAILURE]: () => false,
}, false)

const bookingInstance = handleAction<Booking, Booking>(
  BOOKING_SUCCESS,
  (state, action) => action.payload,
  null
)

export const reducer = combineReducers<State>({
  bookingInstance,
  bookingStatus,
})
