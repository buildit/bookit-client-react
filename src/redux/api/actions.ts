import { RSAA } from 'redux-api-middleware'

import { getAPIEndpoint } from 'Utils'
import { BookingRequest } from 'Models'

import { createApiAction } from './types'

import { createSagaApiAction } from 'Redux/middleware'

const apiEndpoint = getAPIEndpoint()

export const createBooking = createApiAction<BookingRequest, {}>('CREATE_BOOKING', {
  RSAA,
  endpoint: `${apiEndpoint}/v1/booking`,
  method: 'POST',
})

export const actionCreators = {
  createSagaApiBooking: createSagaApiAction({
    endpoint: `${apiEndpoint}/v1/booking`,
    method: 'POST',
    types: [ 'CREATE_BOOKING_PENDING', 'CREATE_BOOKING_SUCCESS', 'CREATE_BOOKING_FAILURE' ],
  }),
}
