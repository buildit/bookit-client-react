import { createReducer } from 'Utils'

import * as ActionTypes from 'ActionTypes'

export const bookingStatus = createReducer(false, {
  [ActionTypes.BOOKING_REQUEST]: () => false,
  [ActionTypes.BOOKING_SUCCESS]: () => true,
  [ActionTypes.BOOKING_FAILURE]: () => false,
})

export default {
  bookingStatus,
}
