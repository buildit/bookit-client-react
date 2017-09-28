import { createReducer } from 'Utils'

import * as ActionTypes from 'ActionTypes'

export const requestInProgress = createReducer(false, {
  [ActionTypes.BOOKING_REQUEST]: () => true,
  [ActionTypes.BOOKING_COMPLETE]: () => false,
})

export default {
  requestInProgress,
}
