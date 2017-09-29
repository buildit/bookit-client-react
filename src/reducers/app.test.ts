import { pingStatus } from './app'

import { pingRequest, pingSuccess, pingFailure } from '../actions/app'

describe('reducers/app', () => {
  describe('#pingStatus(state, action)', () => {

    it('returns false on PING_REQUEST', () => {
      const state = pingStatus(true, pingRequest())
      expect(state).toEqual(false)
    })

    it('returns true on PING_SUCCESS', () => {
      const state = pingStatus(false, pingSuccess())
      expect(state).toEqual(true)
    })

    it('returns false on PING_FAILURE', () => {
      const state = pingStatus(true, pingFailure())
      expect(state).toEqual(false)
    })

    it('returns initialState when passed an unhandled action', () => {
      const state = pingStatus(false, { type: 'LEMON_CURRY' })
      expect(state).toEqual(false)
    })

  })
})
