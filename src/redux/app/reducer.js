import { Map } from 'immutable'

import { handleActions } from 'redux-actions'

const app = handleActions({
  SET_SELECTED_LOCATION: (state, action) => state.set('selectedLocation', action.payload),
}, Map({ selectedLocation: 'b1177996-75e2-41da-a3e9-fcdd75d1ab31' }))

export const requestInProgress = handleActions({
  CREATE_BOOKING_FAILURE: () => false,
  CREATE_BOOKING_PENDING: () => true,
  CREATE_BOOKING_SUCCESS: () => false,
}, false)

export const errors = handleActions({
  CLEAR_ERRORS: () => [],
  APPEND_ERROR: (state, action) => [...state, action.payload],
}, [])

export const toasts = handleActions({
  CLEAR_TOASTS: () => null,
  SET_TOASTS: (state, action) => action.payload,
}, null)

export const reducer = {
  app,
  requestInProgress,
  errors,
  toasts,
}
