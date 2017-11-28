import { all, call, fork, put, race, take } from 'redux-saga/effects'

import { getAllLocations, getAllBookables, getBookings } from './actions'

import { getStartEnd } from 'Utils'  // Temporary

export function* doSomething(action) {
  yield call(console.log, 'GOT ACTION:', action)
}

export function* preloadApplication() {
  console.log('HALLO!')
  yield take('START_PRELOAD_APPLICATION')

  const p = yield all([
    put(getAllLocations()),
    put(getAllBookables()),
    put(getBookings(getStartEnd())),
  ])

  console.dir(p, { depth: null })
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

export const sagas = function* bookingSagas() {
  yield fork(watchForCreateBooking)
  yield fork(preloadApplication)
}
