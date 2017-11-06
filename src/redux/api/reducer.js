import { fromJS } from 'immutable'

import { handleAction, handleActions } from 'redux-actions'

export const locations = handleAction(
  'GET_LOCATIONS_SUCCESS',
  (state, action) => {
    const { entities: { locations }, result } = action.payload
    return state
      .update('entities', map => map.mergeDeep(locations))
      .update('result', list => list.toOrderedSet().concat(result).toList())
  },
  fromJS({ entities: {}, result: [] })
)

export const bookables = handleAction(
  'GET_BOOKABLES_SUCCESS',
  (state, action) => {
    const { entities: { bookables }, result } = action.payload
    return state
      .update('entities', map => map.mergeDeep(bookables))
      .update('result', list => list.toOrderedSet().concat(result).toList())
  },
  fromJS({ entities: {}, result: [] })
)

export const bookings = handleAction(
  'GET_BOOKINGS_SUCCESS',
  (state, action) => {
    const { entities: { bookings }, result } = action.payload
    return state
      .update('entities', map => map.mergeDeep(bookings))
      .update('result', list => list.toOrderedSet().concat(result).toList())
  },
  fromJS({ entities: {}, result: [] })
)

export const bookingInstance = handleAction(
  'CREATE_BOOKING_SUCCESS',
  (state, action) => action.payload,
  null
)
export const requestInProgress = handleActions({
  CREATE_BOOKING_FAILURE: () => false,
  CREATE_BOOKING_PENDING: () => true,
  CREATE_BOOKING_SUCCESS: () => false,
}, false)

export const reducer = {
  locations,
  bookables,
  bookings,
  requestInProgress,
}
