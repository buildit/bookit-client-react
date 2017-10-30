import { createAction } from 'redux-actions'

export const CREATE_BOOKING = 'CREATE_BOOKING'

export type Actions = {
  CREATE_BOOKING: { type: typeof CREATE_BOOKING },
}

export const actionCreators = {
  createBooking: createAction(CREATE_BOOKING),
}
