import { requestInProgress } from './app'

import { bookingRequest, bookingComplete } from 'Actions/booking'

describe('reducers/app', () => {

  describe('#requestInProgress(state, action)', () => {
    it('returns true on BOOKING_REQUEST', () => {
      const state = requestInProgress(false, bookingRequest())
      expect(state).to.be.true
    })

    it('returns false on BOOKING_COMPLETE', () => {
      const state = requestInProgress(true, bookingComplete())
      expect(state).to.be.false
    })

    it('returns initialState when passed an unhandled action', () => {
      const state = requestInProgress(false, { type: 'LEMON_CURRY' })
      expect(state).to.be.false
    })
  })

})
