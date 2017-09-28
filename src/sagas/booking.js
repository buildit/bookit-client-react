import { delay } from 'redux-saga'
import { call, fork, put, takeEvery } from 'redux-saga/effects'

import * as ActionTypes from 'ActionTypes'
import { bookingComplete, bookingSuccess, bookingFailure } from 'Actions'

export function* makeBooking() {
  try {
    yield call(delay, 2000)
    yield put(bookingSuccess())
  } catch (error) {
    yield put(bookingFailure(error))
  } finally {
    yield call(delay, 500)
    yield put(bookingComplete())
  }
}

export function* watchBooking() {
  yield takeEvery(ActionTypes.BOOKING_REQUEST, makeBooking)
}

export default function* booking() {
  yield fork(watchBooking)
}
