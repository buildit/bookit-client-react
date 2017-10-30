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
  const body = normalizeBody(action.payload)
  yield put(actionCreators.apiPostCreateBooking({ body }))
}

export function* getAllBookablesApi(action) {
  const { start, end } = yield select(getFormValues('booking'))
  yield put(actionCreators.apiGetAllBookables({ query: { start, end } }))
}

export const sagas = function* apiSagas() {
  yield takeLatest(CREATE_BOOKING, createBookingApi)
  yield takeLatest(GET_ALL_BOOKABLES, getAllBookablesApi)
}
