import { handleActions } from 'redux-actions'

export const requestInProgress = handleActions({
  CREATE_BOOKING_FAILURE: () => false,
  CREATE_BOOKING_PENDING: () => true,
  CREATE_BOOKING_SUCCESS: () => false,
}, false)

export const errors = handleActions({
  CLEAR_ERRORS: () => [],
  APPEND_ERROR: (state, action) => [...state, action.payload],
}, [])

export const reducer = {
  requestInProgress,
  errors,
}
