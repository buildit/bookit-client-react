import { fork, put, takeEvery } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'

import * as ActionTypes from '../constants/actionTypes'
import { pingSuccess, pingFailure } from '../actions'

import app, { watchPing, ping } from './app'

describe('sagas/app', () => {
  describe('#app()', () => {
    it('forks watchPing()', () => {
      const saga = app()
      const expected = fork(watchPing)

      expect(saga.next().value).toEqual(expected)
      expect(saga.next().done).toEqual(true)
    })
  })

  describe('#watchPing()', () => {
    it('yields takeEvery(ActionTypes.PING_REQUEST, ping)', () => {
      const saga = watchPing()
      const expected = takeEvery(ActionTypes.PING_REQUEST, ping)

      expect(saga.next().value).toEqual(expected)
      expect(saga.next().done).toEqual(true)
    })
  })

  describe('#ping()', () => {
    it('yields PING_SUCCESS when there are no errors and PING_FAILURE when there are', () => {
      const saga = cloneableGenerator(ping)()
      const errorSaga = saga.clone()
      const error = {}

      expect(saga.next().value).toEqual(put(pingSuccess()))
      expect(saga.next().done).toEqual(true)

      errorSaga.next()

      expect(errorSaga.throw(error).value).toEqual(put(pingFailure()))
      expect(errorSaga.next().done).toEqual(true)
    })
  })
})
