import { handleActions } from 'redux-actions'

export const bookingInstance = handleActions({
  CREATE_BOOKING_SUCCESS: (state, action) => action.payload,
  CREATE_BOOKING_PENDING: () => null,
}, null)

export const bookablesForLocation = handleAction(
  'GET_BOOKABLES_SUCCESS',
  (state, action) => action.payload,
  null
)

export const reducer = {
  bookingInstance,
  bookablesForLocation,
}
