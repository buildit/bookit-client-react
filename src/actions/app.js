import { createAction } from 'redux-actions'

import * as ActionTypes from 'ActionTypes'

export const pingRequest = createAction(ActionTypes.PING_REQUEST)
export const pingComplete = createAction(ActionTypes.PING_COMPLETE)
export const pingSuccess = createAction(ActionTypes.PING_SUCCESS)
export const pingFailure = createAction(ActionTypes.PING_FAILURE)
