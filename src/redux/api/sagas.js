import { call, fork, race, take, put } from 'redux-saga/effects'

import history from 'History'

import { actionCreators } from 'Redux'

import * as messages from 'Constants/messages'

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
    const action = yield take('DELETE_BOOKING_PENDING')
    if (action.error) {
      yield put(actionCreators.setToasts(messages.BOOKING_DELETED_ERROR))
      //TODO: Not navigate back to bookings if booking deleted errors.
      yield call(history.replace, '/bookings')
    } else {
      const { failure, success, pending } = yield race({
        pending: take('DELETE_BOOKING_PENDING'),
        failure: take('DELETE_BOOKING_FAILURE'),
        success: take('DELETE_BOOKING_SUCCESS'),
      })
      if (success) {
        yield put(actionCreators.setToasts(messages.BOOKING_DELETED_SUCCESS))
        yield call(history.replace, '/bookings')
      }

      if (failure || pending) {
        yield put(actionCreators.setToasts(messages.BOOKING_DELETED_ERROR))
        //TODO: Not navigate back to bookings if booking deleted errors.
        yield call(history.replace, '/bookings')
      }
    }
  }
}

export const sagas = function* bookingSagas() {
  yield fork(watchForCreateBooking)
  yield fork(watchForDeleteBooking)
}
