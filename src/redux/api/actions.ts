import { RSAA } from 'redux-api-middleware'

import { getAPIEndpoint } from 'Utils'

const apiEndpoint = getAPIEndpoint()

export const createBooking = (booking) => ({
  [RSAA]: {
    body: booking,
    endpoint: `${apiEndpoint}/v1/booking`,
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    types: [ 'CREATE_BOOKING_REQUEST', 'CREATE_BOOKING_SUCCESS', 'CREATE_BOOKING_FAILURE' ],
  },
})
