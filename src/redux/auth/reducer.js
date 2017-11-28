import { handleActions } from 'redux-actions'

import { Map } from 'immutable'

const tokensState = Map({
  authn: null,
  authz: null,
})

const tokens = handleActions({
  SET_AUTHENTICATION_TOKEN: (state, action) => {
    return state.withMutations((state) => {
      state.set('authn', action.payload)
    })
  },
}, tokensState)

export const reducer = {
  tokens,
}
