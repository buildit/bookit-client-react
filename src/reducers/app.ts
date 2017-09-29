import { createReducer } from 'Utils'

import * as ActionTypes from 'ActionTypes'

export const pingStatus = createReducer(false, {
  [ActionTypes.PING_REQUEST]: () => false,
  [ActionTypes.PING_SUCCESS]: () => true,
  [ActionTypes.PING_FAILURE]: () => false,
})

export default {
  pingStatus,
}
