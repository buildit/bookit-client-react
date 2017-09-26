import { createReducer } from '../utils'

import * as ActionTypes from '../constants/actionTypes'

export const pingStatus = createReducer(false, {
  [ActionTypes.PING_REQUEST]: () => false,
  [ActionTypes.PING_SUCCESS]: () => true,
  [ActionTypes.PING_FAILURE]: () => false,
})

export default {
  pingStatus,
}
