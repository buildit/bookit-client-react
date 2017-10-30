import { call, fork, race, take } from 'redux-saga/effects'

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

export function* watchForGetAllBookables() {
  while (true) {
    yield take('GET_ALL_BOOKABLES_PENDING')

    const { failure, success } = yield race({
      failure: take('GET_ALL_BOOKABLES_FAILURE'),
      success: take('GET_ALL_BOOKABLES_SUCCESS'),
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
  yield fork(watchForGetAllBookables)
}
