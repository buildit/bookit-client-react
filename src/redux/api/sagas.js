import { put, takeLatest } from 'redux-saga/effects'

import { actionCreators } from 'Redux'

import { CREATE_BOOKING } from 'Redux/booking'

const normalizeBody = ({ start, end, ...body }) => ({
  ...body,
  end,
  start,
})

export function* createBookingApi(action) {
  // const { startDateTime, endDateTime, ...rest } = yield select(getFormValues('booking'))  // this also works, but whatever is passed to onSubmit in the form gets passed the form values anyway
  const body = normalizeBody(action.payload)
  yield put(actionCreators.postCreateBooking(body))
}

export const sagas = function* apiSagas() {
  yield takeLatest(CREATE_BOOKING, createBookingApi)
}
