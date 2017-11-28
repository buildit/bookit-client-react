import QS from 'querystring'

import { createAction } from 'redux-actions'

import { RSAA, getJSON } from 'redux-api-middleware'

import {
  normalizeLocations,
  normalizeBookables,
  normalizeBookings,
  normalizeBooking,
} from './schema'

import { getAPIEndpoint, addDays, formatDate } from 'Utils'

const apiBaseURI = getAPIEndpoint()
const apiVersion = 'v1'

const apiEndpoint = `${apiBaseURI}/${apiVersion}`

export const startPreloadApplication = createAction('START_PRELOAD_APPLICATION')

// TODO: Most of these are near-duplicates of each other, so we can
// create a function factory that will emit all the common parts
// for each type of `getAllXYZ`

const payloadNormalizer = normalizer => (action, state, res) => getJSON(res).then(json => normalizer(json))


export const getAllLocations = () => ({
  [RSAA]: {
    endpoint: `${apiEndpoint}/location`,
    method: 'GET',
    types: [
      'GET_LOCATIONS_PENDING',
      {
        type: 'GET_LOCATIONS_SUCCESS',
        // payload: (action, state, res) => getJSON(res).then(json => normalizeLocations(json)),
        payload: payloadNormalizer(normalizeLocations),
        meta: { schema: 'locations' },
      },
      'GET_LOCATIONS_FAILURE',
    ],
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
        // payload: (action, state, res) => getJSON(res).then(json => normalizeBookables(json)),
        payload: payloadNormalizer(normalizeBookables),
        meta: { schema: 'bookables' },
      },
      'GET_BOOKABLES_FAILURE',
    ],
  },
})

// Fetches bookings for the date range <start> to <end> exclusive.
// If start and end are not specified, all bookings are fetched
// TODO: It makes sense to have `getBookingsForDay` for a single day
// `getBookingsForWeek` for bookings for a week - possibly more.
export const getBookings = (options = {}) => {
  const { start, end } = options
  const qs = QS.stringify({ start, end })
  return {
    [RSAA]: {
      endpoint: `${apiEndpoint}/booking?${qs}`,
      method: 'GET',
      types: [
        'GET_BOOKINGS_PENDING',
        {
          type: 'GET_BOOKINGS_SUCCESS',
          // payload: (action, state, res) => getJSON(res).then(json => normalizeBookings(json)),
          payload: payloadNormalizer(normalizeBookings),
          meta: { schema: 'bookings' },
        },
        'GET_BOOKINGS_FAILURE',
      ],
    },
  }
}

// CLUNK.
export const getBookingsForSingleDay = (start) => {
  return getBookings({
    start: formatDate(start),
    end: formatDate(addDays(start, 1)),
  })
}

export const createBooking = booking => ({
  [RSAA]: {
    endpoint: `${apiEndpoint}/booking`,
    method: 'POST',
    types: [
      'CREATE_BOOKING_PENDING',
      {
        type: 'CREATE_BOOKING_SUCCESS',
        // payload: (action, state, res) => getJSON(res).then(json => normalizeBooking(json)),
        payload: payloadNormalizer(normalizeBooking),
        meta: { schema: 'bookings' },
      },
      'CREATE_BOOKING_FAILURE',
    ],
    body: JSON.stringify(booking),
    headers: { 'Content-Type': 'application/json' },
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
  },
})

export const actionCreators = {
  startPreloadApplication,
  getAllLocations,
  getAllBookables,
  getBookings,
  getBookingsForSingleDay,
  createBooking,
  deleteBooking,
}
