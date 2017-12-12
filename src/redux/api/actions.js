import QS from 'querystring'

import { RSAA, getJSON } from 'redux-api-middleware'

import {
  normalizeLocations,
  normalizeBookables,
  normalizeBookings,
  normalizeBooking,
  normalizeAvailability,
} from './schema'

import { selectors } from 'Redux'

import { getAPIEndpoint } from 'Utils'

const apiBaseURI = getAPIEndpoint()
const apiVersion = 'v1'

const apiEndpoint = `${apiBaseURI}/${apiVersion}`

// TODO: Most of these are near-duplicates of each other, so we can
// create a function factory that will emit all the common parts
// for each type of `getAllXYZ`

const makeHeaders = (withAuth = true, withJSON = false) => (state) => {
  const headers = {}

  if (withAuth) {
    const authorizationBearerToken = selectors.getAuthenticationToken(state)
    headers['Authorization'] = `Bearer ${authorizationBearerToken}`
  }

  if (withJSON) {
    headers['Content-Type'] = 'application/json'
  }

  return headers
}

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
    headers: makeHeaders(true, false),
  },
})

export const getAllBookables = (locationId = 'b1177996-75e2-41da-a3e9-fcdd75d1ab31') => ({
  [RSAA]: {
    endpoint: `${apiEndpoint}/location/${locationId}/bookable`,
    method: 'GET',
    types: [
      'GET_BOOKABLES_PENDING',
      {
        type: 'GET_BOOKABLES_SUCCESS',
        payload: (action, state, res) => getJSON(res).then(json => normalizeBookables(json)),
      },
      'GET_BOOKABLES_FAILURE',
    ],
    headers: makeHeaders(true, false),
  },
})

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
    headers: makeHeaders(true, false),
  },
})

export const getAvailability = (locationId = 'b1177996-75e2-41da-a3e9-fcdd75d1ab31', options = {}) => {
  const { start, end } = options
  const qs = QS.stringify({ start, end, expand: 'bookings' })
  return {
    [RSAA]: {
      endpoint: `${apiEndpoint}/location/${locationId}/bookable?${qs}`,
      method: 'GET',
      types: [
        'GET_AVAILABILITY_PENDING',
        {
          type: 'GET_AVAILABILITY_SUCCESS',
          payload: (action, state, res) => getJSON(res).then(json => normalizeAvailability(json)),
        },
        'GET_AVAILABILITY_FAILURE',
      ],
      headers: makeHeaders(true, false),
    },
  }
}

export const createBooking = booking => ({
  [RSAA]: {
    endpoint: `${apiEndpoint}/booking`,
    method: 'POST',
    types: [
      'CREATE_BOOKING_PENDING',
      {
        type: 'CREATE_BOOKING_SUCCESS',
        payload: (action, state, res) => getJSON(res).then(json => normalizeBooking(json)),
      },
      'CREATE_BOOKING_FAILURE',
    ],
    body: JSON.stringify(booking),
    headers: makeHeaders(true, true),
  },
})

export const deleteBooking = bookingId => ({
  [RSAA]: {
    endpoint: `${apiEndpoint}/booking/${bookingId}`,
    method: 'DELETE',
    types: [
      'DELETE_BOOKING_PENDING',
      {
        type: 'DELETE_BOOKING_SUCCESS',
        // This is enough for our reducer to know which booking to remove from the entities state slice
        payload: () => bookingId,
      },
      'DELETE_BOOKING_FAILURE',
    ],
    headers: makeHeaders(true, false),
  },
})

export const actionCreators = {
  getAllLocations,
  getAllBookables,
  getAllBookings,
  createBooking,
  deleteBooking,
  getAvailability,
}
