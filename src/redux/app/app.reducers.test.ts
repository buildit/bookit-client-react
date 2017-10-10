import { reducer as requestInProgress } from './reducer'

import { actionCreators } from 'Redux/booking'

describe('reducers/app', () => {

  describe('#requestInProgress(state, action)', () => {
    it('returns true on BOOKING_REQUEST', () => {
      const state = requestInProgress({ requestInProgress: false }, actionCreators.bookingRequest())
      expect(state.requestInProgress).to.be.true
    })

    it('returns false on BOOKING_COMPLETE', () => {
      const state = requestInProgress({ requestInProgress: true }, actionCreators.bookingComplete())
      expect(state.requestInProgress).to.be.false
    })

    it('returns initialState when passed an unhandled action', () => {
      const state = requestInProgress({ requestInProgress: false }, { type: 'LEMON_CURRY' })
      expect(state.requestInProgress).to.be.false
    })
  })

})
