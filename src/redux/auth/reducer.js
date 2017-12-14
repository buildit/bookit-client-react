import { Map } from 'immutable'

import { handleActions } from 'redux-actions'

import { decodeJWT } from 'Utils'

const tokens = handleActions({
  SET_AUTHENTICATION_TOKEN: (state, action) => {
    const { payload: authn } = action
    return state.withMutations((state) => {
      state.set('authn', authn)
    })
  },
}, Map({ authn: null }))

// "Temporary" setup to extract the identity used by the user to login via azure
const user = handleActions({
  SET_AUTHENTICATION_TOKEN: (state, action) => {
    const user = decodeJWT(action.payload)
    return state.withMutations((state) => {
      if (user && user.preferred_username) state.set('email', user.preferred_username)
      if (user && user.oid) state.set('oid', user.oid)
    })
  },
}, Map())

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
