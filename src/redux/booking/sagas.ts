import { call, fork, put, takeEvery, race, take } from 'redux-saga/effects'

import { actionCreators, BOOKING_REQUEST } from 'Redux/booking'
import { BookingRequest } from '../../models/booking-request'

export function* doSomething(action) {
  yield call(console.log, 'GOT ACTION:', action)
}

export function* watchBooking() {
  while (true) {
    yield take('CREATE_BOOKING_PENDING')
    const { failure, success } = yield race({
      failure: take('CREATE_BOOKING_FAILURE'),
      success: take('CREATE_BOOKING_SUCCESS'),
    })
    if (success) {
      yield call(doSomething, success)
    }
    if (failure) {
      yield call(doSomething, failure)
    }
  }
}

export const sagas = function* bookingSagas() {
  yield fork(watchBooking)
}
