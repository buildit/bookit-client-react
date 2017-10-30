import { handleAction } from 'redux-actions'

import { Booking } from 'Models'

export type State = {
  readonly bookingInstance?: Booking
}

export const bookingInstance = handleAction<Booking, Booking>(
  'CREATE_BOOKING_SUCCESS',
  (state, action) => action.payload,
  null
)

export const reducer = {
  bookingInstance,
}
