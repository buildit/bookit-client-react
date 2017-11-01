import { RSAA } from 'redux-api-middleware'

// import { createSagaApiAction } from 'Redux/middleware'

// import { CREATE_BOOKING } from 'Redux/booking'

import { getAPIEndpoint } from 'Utils'

const apiEndpoint = getAPIEndpoint()

export const createBooking = (booking) => {
  console.log('HALLO!')
  console.dir(booking, { depth: null })
  return {
    [RSAA]: {
      endpoint: `${apiEndpoint}/v1/booking`,
      method: 'POST',
      types: [ 'CREATE_BOOKING_PENDING', 'CREATE_BOOKING_SUCCESS', 'CREATE_BOOKING_FAILURE' ],
      body: JSON.stringify(booking),
      headers: { 'Content-Type': 'application/json' },
    },
  }
}

export const getBookablesForLocation = (locationId = 1) => ({
  [RSAA]: {
    endpoint: `${apiEndpoint}/v1/location/${locationId}/bookable`,
    method: 'GET',
    types: [ 'GET_BOOKABLES_PENDING', 'GET_BOOKABLES_SUCCESS', 'GET_BOOKABLES_FAILURE' ],
  },
})

export const actionCreators = {
  // postCreateBooking: createSagaApiAction({
  //   endpoint: `${apiEndpoint}/v1/booking`,
  //   method: 'POST',
  //   types: CREATE_BOOKING,  // inferred types
  //   // types: [ 'CREATE_BOOKING_PENDING', 'CREATE_BOOKING_SUCCESS', 'CREATE_BOOKING_FAILURE' ],  // explicit types
  //   // types: [ { type: CREATE_BOOKING_PENDING, (action) => something }, 'CREATE_BOOKING_FAILURE' ]  // per-type action overrides (note: the example is wrong)
  // }),
  postCreateBooking: createBooking,
  getBookablesForLocation,
}
