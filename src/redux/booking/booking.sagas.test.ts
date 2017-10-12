import { call, fork, put, takeEvery } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'

import { actionCreators, BOOKING_REQUEST } from './actions'

import { sagas as booking, watchBooking, makeBooking } from './sagas'

import { Booking, BookingRequest } from 'Models'

import {createMeeting} from '../../api/index'

describe('sagas/booking', () => {
  describe('#booking()', () => {
    it('forks watchBooking()', () => {
      const saga = booking()
      const expected = fork(watchBooking)

      expect(saga.next().value).to.deep.equal(expected)
      expect(saga.next().done).to.be.true
    })
  })

  describe('#watchBooking()', () => {
    it('yields takeEvery(BOOKING_REQUEST, makeBooking)', () => {
      const saga = watchBooking()
      const expected = takeEvery(BOOKING_REQUEST, makeBooking)

      expect(saga.next().value).to.deep.equal(expected)
      expect(saga.next().done).to.be.true
    })
  })

  describe('#makeBooking()', () => {
    it('yields BOOKING_SUCCESS when there are no errors and BOOKING_FAILURE when there are', () => {
      const saga = cloneableGenerator(makeBooking)()
      const errorSaga = saga.clone()
      const error = new Error('oops')

      const booking: Booking = {bookingId: 1, bookableId: 1, subject: 'booked it', startDateTime: '', endDateTime: ''}

      const request: BookingRequest = {
        bookableId: 1,
        endDateTime: '2017-09-26T09:00:00.000-04:00',
        startDateTime: '2017-09-26T09:00:00.000-04:00',
        subject: 'My New Meeting',
      }

      expect(saga.next().value).to.be.deep.equal(call(createMeeting, request))
      expect(saga.next(booking).value).to.be.deep.equal(put(actionCreators.bookingSuccess(booking)))
      expect(saga.next().value).to.deep.equal(put(actionCreators.bookingComplete()))
      expect(saga.next().done).to.be.true

      errorSaga.next()

      expect(errorSaga.throw(error).value).to.deep.equal(put(actionCreators.bookingFailure(error)))
      expect(errorSaga.next().value).to.deep.equal(put(actionCreators.bookingComplete()))
      expect(errorSaga.next().done).to.be.true
    })
  })
})
