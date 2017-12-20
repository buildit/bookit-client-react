import { Map } from 'immutable'

import { call, fork, put, take, takeEvery, race, select } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'

import history from 'History'

import { selectors, actionCreators } from 'Redux'

import * as messages from 'Constants/messages'

import {
  sagas as api,
  doSomething,
  watchForCreateBooking,
  watchForDeleteBooking,
  setLocationSaga,
} from './sagas'

describe('api/sagas', () => {
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
    it('watches for booking creation actions', () => {
      const saga = cloneableGenerator(watchForCreateBooking)()
      const pendingAction = { type: 'CREATE_BOOKING_PENDING' }

      expect(saga.next(pendingAction).value).to.deep.equal(take('CREATE_BOOKING_PENDING'))

      expect(saga.next().value).to.deep.equal(race({
        failure: take('CREATE_BOOKING_FAILURE'),
        success: take('CREATE_BOOKING_SUCCESS'),
      }))

      const failureSaga = saga.clone()

      expect(saga.next({ success: true }).value).to.deep.equal(put(actionCreators.setToasts(messages.BOOKING_CREATED_SUCCESS)))
      expect(saga.next({ success: true }).value).to.deep.equal(call(doSomething, true))
      expect(saga.next(pendingAction).value).to.deep.equal(call(history.replace, '/bookings'))

      const failure = { payload: true }
      expect(failureSaga.next({ failure }).value).to.deep.equal(call(doSomething, failure))
      expect(failureSaga.next(pendingAction).value).to.deep.equal(take('CREATE_BOOKING_PENDING'))
    })
  })

  describe('#watchForDeleteBooking()', () => {
    it('watches for delete booking actions', () => {
      const saga = cloneableGenerator(watchForDeleteBooking)()
      const pendingAction = { type: 'DELETE_BOOKING_PENDING' }

      expect(saga.next().value).to.deep.equal(take('DELETE_BOOKING_PENDING'))

      const firstPendingSaga = saga.clone()

      expect(firstPendingSaga.next({ ...pendingAction, error: 'AN ERROR' }).value).to.deep.equal(put(actionCreators.setToasts(messages.BOOKING_DELETED_ERROR)))
      expect(firstPendingSaga.next().value).to.deep.equal(call(history.replace, '/bookings'))

      expect(saga.next(pendingAction).value).to.deep.equal(race({
        failure: take('DELETE_BOOKING_FAILURE'),
        success: take('DELETE_BOOKING_SUCCESS'),
        pending: take('DELETE_BOOKING_PENDING'),
      }))

      const failureSaga = saga.clone()
      const pendingSaga = saga.clone()

      expect(saga.next({ success: true }).value).to.deep.equal(put(actionCreators.setToasts(messages.BOOKING_DELETED_SUCCESS)))
      expect(saga.next(pendingAction).value).to.deep.equal(call(history.replace, '/bookings'))

      const failure = { payload: true }
      expect(failureSaga.next({ failure }).value).to.deep.equal(put(actionCreators.setToasts(messages.BOOKING_DELETED_ERROR)))
      expect(failureSaga.next().value).to.deep.equal(call(history.replace, '/bookings'))
      expect(failureSaga.next(pendingAction).value).to.deep.equal(take('DELETE_BOOKING_PENDING'))

      const pending = { payload: true, error: true }
      expect(pendingSaga.next({ pending }).value).to.deep.equal(put(actionCreators.setToasts(messages.BOOKING_DELETED_ERROR)))
      expect(pendingSaga.next().value).to.deep.equal(call(history.replace, '/bookings'))
      expect(pendingSaga.next(pendingAction).value).to.deep.equal(take('DELETE_BOOKING_PENDING'))
    })
  })

  describe('#setLocationSaga()', () => {
    it('', () => {
      const saga = cloneableGenerator(setLocationSaga)()

      expect(saga.next().value).to.deep.equal(select(selectors.getLocationByName, { name: 'NYC' }))

      const noLocationSaga = saga.clone()

      expect(noLocationSaga.next(null).done).to.be.true

      const location = Map({ id: 'abc' })

      expect(saga.next(location).value).to.deep.equal(put(actionCreators.setSelectedLocation(location.get('id'))))
      expect(saga.next().done).to.be.true
      // const location = yield select(selectors.getLocationByName, { name: 'NYC' })
      // if (location) {
      //   yield put(actionCreators.setSelectedLocation(location.get('id')))
      // }

    })
  })

  describe('#api()', () => {
    it('forks api saga', () => {
      const saga = api()

      expect(saga.next().value).to.deep.equal(fork(watchForCreateBooking))
      expect(saga.next().value).to.deep.equal(fork(watchForDeleteBooking))
      expect(saga.next().value).to.deep.equal(takeEvery('GET_LOCATIONS_SUCCESS', setLocationSaga))
      expect(saga.next().done).to.be.true
    })
  })
})
