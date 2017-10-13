import { call, fork, put, takeEvery } from 'redux-saga/effects'

import { actionCreators, BOOKING_REQUEST } from 'Redux/booking'
import { createBooking } from 'Redux/api'
import { createMeeting } from 'Api'
import { BookingRequest } from '../../models/booking-request'

export function* makeBooking() {
  try {
    const request: BookingRequest = {
      bookableId: 1,
      endDateTime: '2017-09-26T09:00:00.000-04:00',
      startDateTime: '2017-09-26T09:00:00.000-04:00',
      subject: 'My New Meeting',
    }
    const createBookingAction = createBooking(request)
    // const meeting = yield put(createBookingAction)
    const meeting = yield call(createMeeting, request)
    const action = actionCreators.bookingSuccess(meeting)
    yield put(action)
  } catch (error) {
    yield put(actionCreators.bookingFailure(error))
  } finally {
    yield put(actionCreators.bookingComplete())
  }
}

export function* doSomething(action) {
  yield call(console.log, 'GOT ACTION:', action)
}

export function* watchBooking() {
  yield takeEvery(BOOKING_REQUEST, makeBooking)
  yield takeEvery('CREATE_BOOKING_SUCCESS', doSomething)
}

export const sagas = function* bookingSagas() {
  yield fork(watchBooking)
}
