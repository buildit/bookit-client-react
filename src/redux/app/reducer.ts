import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

import {
  BOOKING_REQUEST,
  BOOKING_COMPLETE
} from 'Redux/booking'

export type State = {
  readonly requestInProgress: boolean
}

const requestInProgress = handleActions({
  [BOOKING_REQUEST]: () => true,
  [BOOKING_COMPLETE]: () => false,
}, false)

export const reducer = combineReducers<State>({
  requestInProgress,
})
