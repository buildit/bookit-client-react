import { delay } from 'redux-saga'
import { call, fork, put, takeEvery } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'

import { Actions, actionCreators, BOOKING_REQUEST, BOOKING_FAILURE, BOOKING_SUCCESS, BOOKING_COMPLETE } from './actions'

import { sagas as booking, watchBooking, makeBooking } from './sagas'

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

      expect(saga.next().value).to.deep.equal(call(delay, 2000))
      expect(saga.next().value).to.deep.equal(put(actionCreators.bookingSuccess()))
      expect(saga.next().value).to.deep.equal(call(delay, 500))
      expect(saga.next().value).to.deep.equal(put(actionCreators.bookingComplete()))
      expect(saga.next().done).to.be.true

      errorSaga.next()

      expect(errorSaga.throw(error).value).to.deep.equal(put(actionCreators.bookingFailure(error)))
      expect(errorSaga.next().value).to.deep.equal(call(delay, 500))
      expect(errorSaga.next().value).to.deep.equal(put(actionCreators.bookingComplete()))
      expect(errorSaga.next().done).to.be.true
    })
  })
})
