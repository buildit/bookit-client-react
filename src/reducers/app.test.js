import { pingStatus, requestInProgress } from './app'

import { pingRequest, pingComplete, pingSuccess, pingFailure } from 'Actions/app'

describe('reducers/app', () => {

  describe('#pingStatus(state, action)', () => {
    it('returns false on PING_REQUEST', () => {
      const state = pingStatus(true, pingRequest())
      expect(state).to.be.false
    })

    it('returns true on PING_SUCCESS', () => {
      const state = pingStatus(false, pingSuccess())
      expect(state).to.be.true
    })

    it('returns false on PING_FAILURE', () => {
      const state = pingStatus(true, pingFailure())
      expect(state).to.be.false
    })

    it('returns initialState when passed an unhandled action', () => {
      const state = pingStatus(false, { type: 'LEMON_CURRY' })
      expect(state).to.be.false
    })

  })

  describe('#requestInProgress(state, action)', () => {
    it('returns true on PING_REQUEST', () => {
      const state = requestInProgress(false, pingRequest())
      expect(state).to.be.true
    })

    it('returns false on PING_COMPLETE', () => {
      const state = requestInProgress(true, pingComplete())
      expect(state).to.be.false
    })

    it('returns initialState when passed an unhandled action', () => {
      const state = requestInProgress(false, { type: 'LEMON_CURRY' })
      expect(state).to.be.false
    })
  })

})
