import { fork, put, takeEvery } from 'redux-saga/effects'

import * as ActionTypes from '../constants/actionTypes'
import { pingSuccess, pingFailure } from '../actions'

export function* ping() {
  try {
    yield put(pingSuccess())
  } catch (error) {
    yield put(pingFailure(error))
  }
}

export function* watchPing() {
  yield takeEvery(ActionTypes.PING_REQUEST, ping)
}

export default function* app() {
  yield fork(watchPing)
}
