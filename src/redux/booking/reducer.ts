import { handleAction, handleActions } from 'redux-actions'

import { Booking } from 'Models'

import {
  BOOKING_REQUEST,
  BOOKING_SUCCESS,
  BOOKING_FAILURE,
} from './actions'

export type State = {
  bookingStatus: boolean
  bookingInstance?: Booking
}

export const bookingStatus = handleActions<boolean, boolean>({
  [BOOKING_REQUEST]: () => false,
  [BOOKING_SUCCESS]: () => true,
  [BOOKING_FAILURE]: () => false,
}, false)

export const bookingInstance = handleAction<Booking, Booking>(
  BOOKING_SUCCESS,
  (state, action) => action.payload,
  null
)

export const reducer = {
  bookingInstance,
  bookingStatus,
}
