import { handleAction } from 'redux-actions'

export const bookingInstance = handleAction(
  'CREATE_BOOKING_SUCCESS',
  (state, action) => action.payload,
  null
)

export const reducer = {
  bookingInstance,
}
