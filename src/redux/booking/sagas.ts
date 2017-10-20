import { call, fork, put, race, select, take, takeEvery } from 'redux-saga/effects'

import { getFormValues } from 'redux-form'

import Moment from 'moment'

import { actionCreators as bac } from 'Redux/booking'
import { actionCreators as aac } from 'Redux/api'

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
      yield put(bac.bookingSuccess(success.payload))
    }
    if (failure) {
      yield call(doSomething, failure)
    }
  }
}

export function* invokeApiMiddleware(action) {
  // const { startDateTime, endDateTime, ...rest } = yield select(getFormValues('booking'))
  const { startDateTime, endDateTime, ...rest } = action.payload
  yield put(
    aac.createSagaApiBooking({
      ...rest,
      endDateTime: Moment(endDateTime).toISOString(),
      startDateTime: Moment(startDateTime).toISOString(),
    })
  )
}

export const sagas = function* bookingSagas() {
  yield fork(watchBooking)
  yield takeEvery(bac.bookingRequest, invokeApiMiddleware)
}
