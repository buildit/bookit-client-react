import { call, fork, race, take } from 'redux-saga/effects'

import history from 'History'

export function* doSomething(action) {
  yield call(console.log, 'GOT ACTION:', action)
}

export function* watchForCreateBooking() {
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

export function* watchForDeleteBooking() {
  while (true) {
    yield take('DELETE_BOOKING_SUCCESS')
    yield call(history.replace, '/bookings')
    //TODO: Add some kind of notification about deleted booking
  }
}

export const sagas = function* bookingSagas() {
  yield fork(watchForCreateBooking)
  yield fork(watchForDeleteBooking)
}
