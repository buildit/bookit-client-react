import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

import { Booking } from '../../models/booking'

import {
  BOOKING_REQUEST,
  BOOKING_SUCCESS,
  BOOKING_FAILURE,
} from './'

export type State = {
  bookingStatus: boolean
  instance?: Booking
}

const bookingStatus = handleActions<boolean>({
  [BOOKING_REQUEST]: () => false,
  [BOOKING_SUCCESS]: () => true,
  [BOOKING_FAILURE]: () => false,
}, false)

const instance = handleActions<Booking>({
  [BOOKING_SUCCESS]: (state, action) => action.payload,
}, null)

export const reducer = combineReducers<State>({
  bookingStatus,
  instance,
})
