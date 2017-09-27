import { delay } from 'redux-saga'
import { call, fork, put, takeEvery } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'

import * as ActionTypes from 'ActionTypes'
import { pingComplete, pingSuccess, pingFailure } from 'Actions'

import app, { watchPing, ping } from './app'

describe('sagas/app', () => {
  describe('#app()', () => {
    it('forks watchPing()', () => {
      const saga = app()
      const expected = fork(watchPing)

      expect(saga.next().value).to.deep.equal(expected)
      expect(saga.next().done).to.be.true
    })
  })

  describe('#watchPing()', () => {
    it('yields takeEvery(ActionTypes.PING_REQUEST, ping)', () => {
      const saga = watchPing()
      const expected = takeEvery(ActionTypes.PING_REQUEST, ping)

      expect(saga.next().value).to.deep.equal(expected)
      expect(saga.next().done).to.be.true
    })
  })

  describe('#ping()', () => {
    it('yields PING_SUCCESS when there are no errors and PING_FAILURE when there are', () => {
      const saga = cloneableGenerator(ping)()
      const errorSaga = saga.clone()
      const error = {}

      expect(saga.next().value).to.deep.equal(call(delay, 2000))
      expect(saga.next().value).to.deep.equal(put(pingSuccess()))
      expect(saga.next().value).to.deep.equal(call(delay, 500))
      expect(saga.next().value).to.deep.equal(put(pingComplete()))
      expect(saga.next().done).to.be.true

      errorSaga.next()

      expect(errorSaga.throw(error).value).to.deep.equal(put(pingFailure(error)))
      expect(errorSaga.next().value).to.deep.equal(call(delay, 500))
      expect(errorSaga.next().value).to.deep.equal(put(pingComplete()))
      expect(errorSaga.next().done).to.be.true
    })
  })
})
