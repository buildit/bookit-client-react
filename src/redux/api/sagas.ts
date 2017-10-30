import { put, select, takeLatest } from 'redux-saga/effects'

import { getFormValues } from 'redux-form'

import Moment from 'moment'

import { actionCreators } from 'Redux'

import { GET_ALL_BOOKABLES, CREATE_BOOKING } from 'Redux/booking'

const normalizeBody = ({ start, end, ...body }) => ({
  ...body,
  end: Moment(end).toISOString(),
  start: Moment(start).toISOString(),
})

export function* createBookingApi(action) {
  console.log('CREATE_BOOKING_API', action)
  // const { startDateTime, endDateTime, ...rest } = yield select(getFormValues('booking'))  // this also works, but whatever is passed to onSubmit in the form gets passed the form values anyway
  const body = normalizeBody(action.payload)
  yield put(actionCreators.postCreateBooking({ body }))
}

export function* getAllBookablesApi(action) {
  console.log('GET_ALL_BOOKABLES_API', action)
  const { start, end } = yield select(getFormValues('booking'))
  const query = { start, end }
  console.log('HALLO?', start, end)
  console.log('PIGBUTTS!', query)
  yield put(actionCreators.getGetAllBookables({ query }))
}

export const sagas = function* apiSagas() {
  console.log('ONE')
  yield takeLatest(CREATE_BOOKING, createBookingApi)
  console.log('TWO')
  yield takeLatest(GET_ALL_BOOKABLES, getAllBookablesApi)
  console.log('THREE')
}
