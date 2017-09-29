import { createAction } from 'redux-actions'

import * as ActionTypes from '../constants/actionTypes'

export const pingRequest = createAction(ActionTypes.PING_REQUEST)
export const pingSuccess = createAction(ActionTypes.PING_SUCCESS)
export const pingFailure = createAction(ActionTypes.PING_FAILURE)
