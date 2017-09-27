import { createReducer } from 'Utils'

import * as ActionTypes from 'ActionTypes'

export const pingStatus = createReducer(false, {
  [ActionTypes.PING_REQUEST]: () => false,
  [ActionTypes.PING_SUCCESS]: () => true,
  [ActionTypes.PING_FAILURE]: () => false,
})

export const requestInProgress = createReducer(false, {
  [ActionTypes.PING_REQUEST]: () => true,
  [ActionTypes.PING_COMPLETE]: () => false,
})

export default {
  pingStatus,
  requestInProgress,
}
