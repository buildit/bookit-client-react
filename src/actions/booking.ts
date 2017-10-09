import { createAction } from 'redux-actions'

import * as ActionTypes from 'ActionTypes'

export const bookingRequest = createAction(ActionTypes.BOOKING_REQUEST)
export const bookingComplete = createAction(ActionTypes.BOOKING_COMPLETE)
export const bookingSuccess = createAction(ActionTypes.BOOKING_SUCCESS)
export const bookingFailure = createAction(ActionTypes.BOOKING_FAILURE)
