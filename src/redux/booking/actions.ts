import { createAction } from 'redux-actions'

import { Booking } from 'Models'

export const BOOKING_COMPLETE = 'BOOKING_COMPLETE'
export const BOOKING_FAILURE = 'BOOKING_FAILURE'
export const BOOKING_REQUEST = 'BOOKING_REQUEST'
export const BOOKING_SUCCESS = 'BOOKING_SUCCESS'

export const CREATE_BOOKING = 'CREATE_BOOKING'

export type Actions = {
  BOOKING_COMPLETE: { type: typeof BOOKING_COMPLETE },
  BOOKING_FAILURE: { type: typeof BOOKING_FAILURE, error: Error },
  BOOKING_REQUEST: { type: typeof BOOKING_REQUEST },
  BOOKING_SUCCESS: { type: typeof BOOKING_SUCCESS, payload: Booking },
  CREATE_BOOKING: { type: typeof CREATE_BOOKING },
}

export const actionCreators = {
  bookingComplete: createAction(BOOKING_COMPLETE),
  bookingFailure: createAction<Error>(BOOKING_FAILURE),
  bookingRequest: createAction(BOOKING_REQUEST),
  bookingSuccess: createAction<Booking>(BOOKING_SUCCESS),

  createBooking: createAction(CREATE_BOOKING),
}
