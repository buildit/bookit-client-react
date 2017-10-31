import { createAction } from 'redux-actions'

export const CREATE_BOOKING = 'CREATE_BOOKING'

export const actionCreators = {
  createBooking: createAction(CREATE_BOOKING),
}
