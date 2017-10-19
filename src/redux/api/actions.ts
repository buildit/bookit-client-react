import { RSAA } from 'redux-api-middleware'

import { getAPIEndpoint } from 'Utils'
import { BookingRequest } from 'Models'

import { createApiAction } from './types'

const apiEndpoint = getAPIEndpoint()

export const createBooking = createApiAction<BookingRequest, {}>('CREATE_BOOKING', {
  RSAA,
  endpoint: `${apiEndpoint}/v1/booking`,
  method: 'POST',
})
