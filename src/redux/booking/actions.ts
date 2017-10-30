import { createAction } from 'redux-actions'

export const CREATE_BOOKING = 'CREATE_BOOKING'
export const GET_ALL_BOOKABLES = 'GET_ALL_BOOKABLES'

export type Actions = {
  CREATE_BOOKING: { type: typeof CREATE_BOOKING },
  GET_ALL_BOOKABLES: { type: typeof GET_ALL_BOOKABLES },
}

export const actionCreators = {
  createBooking: createAction(CREATE_BOOKING),
  getAllBookables: createAction(GET_ALL_BOOKABLES),
}
