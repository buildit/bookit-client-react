import { createSagaApiAction } from 'Redux/middleware'

import { CREATE_BOOKING } from 'Redux/booking'

import { getAPIEndpoint } from 'Utils'

const apiEndpoint = getAPIEndpoint()
const locationEndpoint = `${apiEndpoint}/v1/location/1/bookable`

export const actionCreators = {
  getAllBookables: createSagaApiAction({
    endpoint: `${locationEndpoint}`,
    method: 'GET',
    types: [
      {
        payload: (action, state) => {
          console.log(state)
          return { endpoint: action.endpoint }
        },
        type: 'GET_BOOKABLES_PENDING',
      },
      'GET_BOOKABLES_SUCCESS',
      'GET_BOOKABLES_FAILURE',
    ],
  }),

  postCreateBooking: createSagaApiAction({
    endpoint: `${apiEndpoint}/v1/booking`,
    method: 'POST',
    types: CREATE_BOOKING,  // inferred types
    // types: [ 'CREATE_BOOKING_PENDING', 'CREATE_BOOKING_SUCCESS', 'CREATE_BOOKING_FAILURE' ],  // explicit types
    // types: [ { type: CREATE_BOOKING_PENDING, (action) => something }, 'CREATE_BOOKING_FAILURE' ]  // per-type action overrides (note: the example is wrong)
  }),
}
