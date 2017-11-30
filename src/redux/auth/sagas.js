import { fork, call, take, put, select, race, all } from 'redux-saga/effects'

import { parseOauthFragment, clearStoredAuthentication, getStoredAuthentication, setStoredAuthentication, validateToken } from 'Utils'
import { actionCreators } from './actions'
import { getAuthenticationToken } from './selectors'
import * as tokenStates from 'Constants/token-states'
import history from 'History'

export function* loadLocalAuthenticationIntoState() {
  const authnToken = yield call(getStoredAuthentication)
  yield put.resolve(actionCreators.setAuthenticationToken(authnToken))
}

export function* clearAllAuth() {
  yield all([
    call(clearStoredAuthentication),
    put(actionCreators.clearAuthentication()),
  ])
}

export function* settleAuthenticationToken(token) {
  yield all([
    call(setStoredAuthentication, token),
    put(actionCreators.setAuthenticationToken(token)),
  ])
}

export function* awaitLogout() {
  yield take('LOGOUT_REQUEST')

  yield call(clearAllAuth)
  yield put(actionCreators.logoutSuccess())

  // Restart the authorization flow
  yield call(authFlow)
}

export function* retrieveAuthenticationToken() {
  const authnToken = yield select(getAuthenticationToken)
  const tokenState = yield call(validateToken, authnToken)
  if (tokenState === tokenStates.TOKEN_VALID) {
    return authnToken
  }

  let refreshedAuthnToken

  // Authentication tokens are capable of being silently refreshed,
  // but refreshing the token cannot happen with XHR - we have to use
  // an iframe and poll for the new token from the location hash
  if (tokenState === tokenStates.TOKEN_EXPIRED) {
    yield put(actionCreators.refreshAuthRequest())

    const { success, failure } =  yield race({
      success: take('REFRESH_AUTH_SUCCESS'),
      failure: take('REFRESH_AUTH_FAILURE'),
    })

    if (success) {
      refreshedAuthnToken = yield call(parseOauthFragment, success.payload, 'access_token')
      yield call(settleAuthenticationToken, refreshedAuthnToken)
    } else {
      yield call(console.log, 'FAILED TO REFRESH:', failure.payload)
    }
  }

  return refreshedAuthnToken
}

export function* awaitAuthentication() {
  const { payload } = yield take('AUTH_REQUEST')
  const authnToken = yield call(parseOauthFragment, payload, 'access_token')
  yield call(settleAuthenticationToken, authnToken)
  return authnToken
}

export function* authFlow() {
  let authnToken = yield call(retrieveAuthenticationToken)
  while (!authnToken) {
    authnToken = yield call(awaitAuthentication)
  }
  yield put(actionCreators.loginSuccess())
  yield call(history.replace, '/')
  yield call(awaitLogout)
}

export function* watchForAuthentication() {
  // Prime the authentication state with stored authn token
  yield call(loadLocalAuthenticationIntoState)
  // Begin the full authentication flow
  yield call(authFlow)
}

export const sagas = function* authSagas() {
  yield fork(watchForAuthentication)
}
