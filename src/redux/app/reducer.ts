import { handleActions } from 'redux-actions'

export type State = {
  readonly requestInProgress: boolean
}

export const requestInProgress = handleActions({
  CREATE_BOOKING_FAILURE: () => false,
  CREATE_BOOKING_PENDING: () => true,
  CREATE_BOOKING_SUCCESS: () => false,
}, false)

export const reducer = {
  requestInProgress,
}
