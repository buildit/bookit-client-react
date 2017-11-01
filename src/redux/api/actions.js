import { RSAA } from 'redux-api-middleware'

import { getAPIEndpoint } from 'Utils'

const apiEndpoint = getAPIEndpoint()

export const createBooking = booking => ({
  [RSAA]: {
    endpoint: `${apiEndpoint}/v1/booking`,
    method: 'POST',
    types: [ 'CREATE_BOOKING_PENDING', 'CREATE_BOOKING_SUCCESS', 'CREATE_BOOKING_FAILURE' ],
    body: JSON.stringify(booking),
    headers: { 'Content-Type': 'application/json' },
  },
})

export const getBookablesForLocation = (locationId = 1) => ({
  [RSAA]: {
    endpoint: `${apiEndpoint}/v1/location/${locationId}/bookable`,
    method: 'GET',
    types: [ 'GET_BOOKABLES_PENDING', 'GET_BOOKABLES_SUCCESS', 'GET_BOOKABLES_FAILURE' ],
  },
})

export const actionCreators = {
  createBooking,
  getBookablesForLocation,
}
