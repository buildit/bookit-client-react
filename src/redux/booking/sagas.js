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

export function* watchForGetBookablesForLocation() {
  while (true) {
    yield take('GET_BOOKABLES_PENDING')

    const { failure, success } = yield race({
      failure: take('GET_BOOKABLES_FAILURE'),
      success: take('GET_BOOKABLES_SUCCESS'),
    })

    if (success) {
      // We need to extract the `available` value from the success payload
      // and either `put` it with another action (and likely into
      // another piece of redux state) or we can use redux-form
      // actionCreators to create an artificial error for the UI
      // to render
      yield call(doSomething, success)
    }

    if (failure) {
      yield call(doSomething, failure)
    }
  }
}

export const sagas = function* bookingSagas() {
  yield fork(watchForCreateBooking)
  yield fork(watchForGetBookablesForLocation)
}
