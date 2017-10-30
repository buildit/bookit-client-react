import { createSagaApiAction } from 'Redux/middleware'

import { GET_ALL_BOOKABLES, CREATE_BOOKING } from 'Redux/booking'

import { getAPIEndpoint } from 'Utils'

const apiEndpoint = getAPIEndpoint()

export const actionCreators = {
  apiGetAllBookables: createSagaApiAction({
    endpoint: `${apiEndpoint}/v1/location/1/bookable`,
    method: 'GET',
    types: GET_ALL_BOOKABLES,
  }),

  apiPostCreateBooking: createSagaApiAction({
    endpoint: `${apiEndpoint}/v1/booking`,
    method: 'POST',
    types: CREATE_BOOKING,  // inferred types
    // types: [ 'CREATE_BOOKING_PENDING', 'CREATE_BOOKING_SUCCESS', 'CREATE_BOOKING_FAILURE' ],  // explicit types
    // types: [ { type: CREATE_BOOKING_PENDING, (action) => something }, 'CREATE_BOOKING_FAILURE' ]  // per-type action overrides (note: the example is wrong)
  }),
}
