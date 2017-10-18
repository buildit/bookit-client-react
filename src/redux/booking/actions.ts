import { createAction } from 'redux-actions'

import { Booking } from 'Models'

export const BOOKING_COMPLETE = 'BOOKING_COMPLETE'
export const BOOKING_FAILURE = 'BOOKING_FAILURE'
export const BOOKING_REQUEST = 'BOOKING_REQUEST'
export const BOOKING_SUCCESS = 'BOOKING_SUCCESS'

export type Actions = {
  BOOKING_COMPLETE: { type: typeof BOOKING_COMPLETE },
  BOOKING_FAILURE: { type: typeof BOOKING_FAILURE, error: Error },
  BOOKING_REQUEST: { type: typeof BOOKING_REQUEST },
  BOOKING_SUCCESS: { type: typeof BOOKING_SUCCESS, payload: Booking },
}

export const actionCreators = {
  bookingComplete: createAction(BOOKING_COMPLETE),
  bookingFailure: createAction<Error>(BOOKING_FAILURE),
  bookingRequest: createAction(BOOKING_REQUEST),
  bookingSuccess: createAction<Booking>(BOOKING_SUCCESS),
}
