import { call, fork, put, takeEvery, take, race } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'

import { actionCreators, BOOKING_REQUEST } from './actions'

import { sagas as booking, watchBooking, doSomething } from './sagas'

import { Booking, BookingRequest } from 'Models'

describe('sagas/booking', () => {
  describe('#doSomething(action)', () => {
    it('logs to console with action', () => {
      const action = {
        type: 'DUMMY_ACTION',
      }
      const saga = doSomething(action)
      const expected = call(console.log, 'GOT ACTION:', action)

      expect(saga.next().value).to.deep.equal(expected)
      expect(saga.next().done).to.be.true
    })
  })

  describe('#watchBooking()', () => {
    //  while (true) {
    //   yield take('CREATE_BOOKING_PENDING')
    //   const { failure, success } = yield race({
    //     failure: take('CREATE_BOOKING_FAILURE'),
    //     success: take('CREATE_BOOKING_SUCCESS'),
    //   })
    //   if (success) {
    //     yield call(doSomething, success)
    //   }
    //   if (failure) {
    //     yield call(doSomething, failure)
    //   }
    // }
    it('logs success if successful', () => {
      const saga = cloneableGenerator(watchBooking)()
      const pendingAction = { type: 'CREATE_BOOKING_PENDING' }
      const successAction = { type: 'CREATE_BOOKING_SUCCESS' }
      const failureAction = { type: 'CREATE_BOOKING_FAILURE' }

      expect(saga.next(pendingAction).value).to.deep.equal(take('CREATE_BOOKING_PENDING'))

      const failureSaga = saga.clone()
      expect(failureSaga.next(failureAction).value).to.deep.equal(race({
        failure: take('CREATE_BOOKING_FAILURE'),
        success: take('CREATE_BOOKING_SUCCESS'),
      }))
      expect(failureSaga.next(failureAction).value).to.deep.equal(call(doSomething, failureAction))

      // expect(saga.next(successAction).value).to.deep.equal(race({
      //   failure: take('CREATE_BOOKING_FAILURE'),
      //   success: take('CREATE_BOOKING_SUCCESS'),
      // }))
      // expect(saga.next(successAction).value).to.deep.equal(call(doSomething, successAction))
    })
  })

  describe('#booking()', () => {
    it('forks watchBooking()', () => {
      const saga = booking()
      const expected = fork(watchBooking)

      expect(saga.next().value).to.deep.equal(expected)
      expect(saga.next().done).to.be.true
    })
  })
})
