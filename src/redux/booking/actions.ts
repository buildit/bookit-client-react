import { createAction } from 'redux-actions'
import {Booking} from '../../models/booking';

export const BOOKING_COMPLETE = 'BOOKING_COMPLETE'
export const BOOKING_FAILURE = 'BOOKING_FAILURE'
export const BOOKING_REQUEST = 'BOOKING_REQUEST'
export const BOOKING_SUCCESS = 'BOOKING_SUCCESS'

export interface BookingAction {
  type: string
}

export interface ErrorBookingAction extends BookingAction {
  error: Error
}

export interface SuccessBookingAction extends BookingAction {
  payload: Booking
}


export type Actions = {
  BOOKING_COMPLETE: BookingAction,
  BOOKING_FAILURE: ErrorBookingAction,
  BOOKING_REQUEST: BookingAction,
  BOOKING_SUCCESS: SuccessBookingAction,
}

export const actionCreators = {
  bookingComplete: createAction(BOOKING_COMPLETE),
  bookingFailure: createAction<Error>(BOOKING_FAILURE),
  bookingRequest: createAction(BOOKING_REQUEST),
  bookingSuccess: createAction<Booking>(BOOKING_SUCCESS),
}
