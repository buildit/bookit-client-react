import { handleActions } from 'redux-actions'

export const bookingInstance = handleActions({
  CREATE_BOOKING_SUCCESS: (state, action) => action.payload,
  CREATE_BOOKING_PENDING: () => null,
}, null)

export const bookables = handleAction(
  'GET_BOOKABLES_SUCCESS',
  (state, action) => action.payload,
  [
    {
      id: 1,
      locationId: 1,
      name: 'Red',
      disposition: {
        closed: false,
        reason: '',
      },
      bookings: [],
    },
    {
      id: 2,
      locationId: 1,
      name: 'Blue',
      disposition: {
        closed: true,
        reason: 'construction',
      },
      bookings: [],
    },
    {
      id: 3,
      locationId: 2,
      name: 'Green',
      disposition: {
        closed: false,
        reason: '',
      },
      bookings: [],
    },
  ]
)

export const reducer = {
  bookingInstance,
  bookables,
}
