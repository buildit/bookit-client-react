import { Map } from 'immutable'

import { handleActions } from 'redux-actions'

import { decodeJWT } from 'Utils'

const tokensState = Map({
  authn: null,
  authz: null,
})

const tokens = handleActions({
  SET_AUTHENTICATION_TOKEN: (state, action) => {
    const { payload: authn } = action
    return state.withMutations((state) => {
      state.set('authn', authn)
    })
  },
}, tokensState)

// "Temporary" setup to extract the identity used by the user to login via azure
const user = handleActions({
  SET_AUTHENTICATION_TOKEN: (state, action) => {
    const user = decodeJWT(action.payload)
    if (user && user.unique_name) {
      return user.unique_name
    }
    return null
  },
}, null)

const refreshAuthentication = handleActions({
  REFRESH_AUTH_REQUEST: () => true,
  REFRESH_AUTH_SUCCESS: () => false,
  REFRESH_AUTH_FAILURE: () => false,
}, false)

export const reducer = {
  tokens,
  user,
  refreshAuthentication,
}
