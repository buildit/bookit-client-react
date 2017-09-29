import { fork, put, takeEvery } from 'redux-saga/effects'

import { PING_REQUEST } from 'ActionTypes'
import { pingSuccess, pingFailure } from 'Actions'

export function* ping() {
  try {
    yield put(pingSuccess())
  } catch (error) {
    yield put(pingFailure())
  }
}

export function* watchPing() {
  yield takeEvery(PING_REQUEST, ping)
}

export default function* app() {
  yield fork(watchPing)
}
