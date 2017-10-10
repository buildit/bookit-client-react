import { delay } from 'redux-saga'
import { call, fork, put, takeEvery } from 'redux-saga/effects'

import { actionCreators, BOOKING_REQUEST } from 'Redux/booking'

export function* makeBooking() {
  try {
    yield call(delay, 2000)
    yield put(actionCreators.bookingSuccess())
  } catch (error) {
    yield put(actionCreators.bookingFailure(error))
  } finally {
    yield call(delay, 500)
    yield put(actionCreators.bookingComplete())
  }
}

export function* watchBooking() {
  yield takeEvery(BOOKING_REQUEST, makeBooking)
}

export const sagas = function* bookingSagas() {
  yield fork(watchBooking)
}
