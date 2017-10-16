import { RSAA } from 'redux-api-middleware'

import { getAPIEndpoint } from 'Utils'
import { createApiAction } from './types'
import { BookingRequest } from 'Models'

const apiEndpoint = getAPIEndpoint()

export const createBooking = createApiAction<BookingRequest, {}>('CREATE_BOOKING', {
  RSAA,
  endpoint: `${apiEndpoint}/v1/booking`,
  method: 'POST',
})
