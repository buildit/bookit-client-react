import QS from 'querystring'

import { RSAA, getJSON } from 'redux-api-middleware'

import {
  normalizeLocations,
  normalizeBookables,
  normalizeBookings,
} from './schema'

import { getAPIEndpoint } from 'Utils'

const apiBaseURI = getAPIEndpoint()
const apiVersion = 'v1'

const apiEndpoint = `${apiBaseURI}/${apiVersion}`

// TODO: Most of these are near-duplicates of each other, so we can
// create a function factory that will emit all the common parts
// for each type of `getAllXYZ`

export const getAllLocations = () => ({
  [RSAA]: {
    endpoint: `${apiEndpoint}/location`,
    method: 'GET',
    types: [
      'GET_LOCATIONS_PENDING',
      {
        type: 'GET_LOCATIONS_SUCCESS',
        payload: (action, state, res) => getJSON(res).then(json => normalizeLocations(json)),
      },
      'GET_LOCATIONS_FAILURE',
    ],
  },
})

export const getAllBookables = (locationId = 1, options = {}) => {
  const { start, end } = options
  const qs = QS.stringify({ start, end, expand: 'bookings' })
  return {
    [RSAA]: {
      endpoint: `${apiEndpoint}/location/${locationId}/bookable?${qs}`,
      method: 'GET',
      types: [
        'GET_BOOKABLES_PENDING',
        {
          type: 'GET_BOOKABLES_SUCCESS',
          payload: (action, state, res) => getJSON(res).then(json => normalizeBookables(json)),
        },
        'GET_BOOKABLES_FAILURE',
      ],
    },
  }
}

export const getAllBookings = () => ({
  [RSAA]: {
    endpoint: `${apiEndpoint}/booking`,
    method: 'GET',
    types: [
      'GET_BOOKINGS_PENDING',
      {
        type: 'GET_BOOKINGS_SUCCESS',
        payload: (action, state, res) => getJSON(res).then(json => normalizeBookings(json)),
      },
      'GET_BOOKINGS_FAILURE',
    ],
  },
})

export const createBooking = booking => ({
  [RSAA]: {
    endpoint: `${apiEndpoint}/booking`,
    method: 'POST',
    types: [ 'CREATE_BOOKING_PENDING', 'CREATE_BOOKING_SUCCESS', 'CREATE_BOOKING_FAILURE' ],
    body: JSON.stringify(booking),
    headers: { 'Content-Type': 'application/json' },
  },
})

export const deleteBooking = bookingId => ({
  [RSAA]: {
    endpoint: `${apiEndpoint}/booking/${bookingId}`,
    method: 'DELETE',
    types: [ 'DELETE_BOOKING_PENDING', 'DELETE_BOOKING_SUCCESS', 'DELETE_BOOKING_FAILURE' ],
  },
})

export const actionCreators = {
  getAllLocations,
  getAllBookables,
  getAllBookings,

  createBooking,
  deleteBooking,

  getBookablesForLocation: getAllBookables,
}
