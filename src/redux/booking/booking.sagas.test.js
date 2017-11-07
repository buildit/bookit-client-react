import { call, fork, take, race, put } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'

import { sagas as booking, watchForCreateBooking, watchForGetBookablesForLocation, doSomething } from './sagas'

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

  describe('#watchForCreateBooking()', () => {
    it('logs success if successful', () => {
      const saga = cloneableGenerator(watchForCreateBooking)()
      const pendingAction = { type: 'CREATE_BOOKING_PENDING' }

      expect(saga.next(pendingAction).value).to.deep.equal(take('CREATE_BOOKING_PENDING'))
      expect(saga.next().value).to.deep.equal(put({ type: 'CLEAR_ERRORS' }))

      expect(saga.next().value).to.deep.equal(race({
        failure: take('CREATE_BOOKING_FAILURE'),
        success: take('CREATE_BOOKING_SUCCESS'),
      }))

      const failureSaga = saga.clone()

      expect(saga.next({ success: true }).value).to.deep.equal(call(doSomething, true))
      expect(saga.next(pendingAction).value).to.deep.equal(take('CREATE_BOOKING_PENDING'))

      const failure = {payload: true}
      expect(failureSaga.next({ failure }).value).to.deep.equal(put({ type: 'APPEND_ERROR', payload: true }))
      expect(failureSaga.next().value).to.deep.equal(call(doSomething, failure))
      expect(failureSaga.next(pendingAction).value).to.deep.equal(take('CREATE_BOOKING_PENDING'))
    })
  })

  describe('#watchForGetBookablesForLocation()', () => {
    it('logs success if successful', () => {
      const saga = cloneableGenerator(watchForGetBookablesForLocation)()
      const pendingAction = { type: 'GET_BOOKABLES_PENDING' }

      expect(saga.next(pendingAction).value).to.deep.equal(take('GET_BOOKABLES_PENDING'))

      expect(saga.next().value).to.deep.equal(race({
        failure: take('GET_BOOKABLES_FAILURE'),
        success: take('GET_BOOKABLES_SUCCESS'),
      }))

      const failureSaga = saga.clone()

      expect(saga.next({ success: true }).value).to.deep.equal(call(doSomething, true))
      expect(saga.next(pendingAction).value).to.deep.equal(take('GET_BOOKABLES_PENDING'))

      expect(failureSaga.next({ failure: true }).value).to.deep.equal(call(doSomething, true))
      expect(failureSaga.next(pendingAction).value).to.deep.equal(take('GET_BOOKABLES_PENDING'))
    })
  })

  describe('#booking()', () => {
    it('forks watchForCreateBooking()', () => {
      const saga = booking()

      expect(saga.next().value).to.deep.equal(fork(watchForCreateBooking))
      expect(saga.next().value).to.deep.equal(fork(watchForGetBookablesForLocation))
      expect(saga.next().done).to.be.true
    })
  })
})
