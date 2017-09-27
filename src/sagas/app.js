import { delay } from 'redux-saga'
import { call, fork, put, takeEvery } from 'redux-saga/effects'

import * as ActionTypes from 'ActionTypes'
import { pingComplete, pingSuccess, pingFailure } from 'Actions'

export function* ping() {
  try {
    yield call(delay, 2000)
    yield put(pingSuccess())
  } catch (error) {
    yield put(pingFailure(error))
  } finally {
    yield call(delay, 500)
    yield put(pingComplete())
  }
}

export function* watchPing() {
  yield takeEvery(ActionTypes.PING_REQUEST, ping)
}

export default function* app() {
  yield fork(watchPing)
}
