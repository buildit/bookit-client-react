import { call, fork, put, takeEvery } from 'redux-saga/effects'

import { actionCreators, BOOKING_REQUEST } from 'Redux/booking'
import { createBooking } from 'Redux/api'
import { BookingRequest } from '../../models/booking-request'

export function* makeBooking() {
  try {
    const request: BookingRequest = {
      bookableId: 1,
      endDateTime: '2017-09-26T09:00:00.000-04:00',
      startDateTime: '2017-09-26T09:00:00.000-04:00',
      subject: 'My New Meeting',
    }

    const meeting = yield put(createBooking, request)
    const action = actionCreators.bookingSuccess(meeting)
    yield put(action)
  } catch (error) {
    yield put(actionCreators.bookingFailure(error))
  } finally {
    yield put(actionCreators.bookingComplete())
  }
}

export function* watchBooking() {
  yield takeEvery(BOOKING_REQUEST, makeBooking)
}

export const sagas = function* bookingSagas() {
  yield fork(watchBooking)
}
