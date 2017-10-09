import { bookingStatus } from './booking'

import { bookingRequest, bookingSuccess, bookingFailure } from 'Actions/booking'

describe('reducers/booking', () => {

  describe('#bookingStatus(state, action)', () => {
    it('returns false on BOOKING_REQUEST', () => {
      const state = bookingStatus(true, bookingRequest())
      expect(state).to.be.false
    })

    it('returns true on BOOKING_SUCCESS', () => {
      const state = bookingStatus(false, bookingSuccess())
      expect(state).to.be.true
    })

    it('returns false on BOOKING_FAILURE', () => {
      const state = bookingStatus(true, bookingFailure())
      expect(state).to.be.false
    })

    it('returns initialState when passed an unhandled action', () => {
      const state = bookingStatus(false, { type: 'LEMON_CURRY' })
      expect(state).to.be.false
    })

  })

})
