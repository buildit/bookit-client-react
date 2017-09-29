import { fork, put, takeEvery } from 'redux-saga/effects'

import { PING_REQUEST } from '../constants/actionTypes'
import { pingSuccess, pingFailure } from '../actions'

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
