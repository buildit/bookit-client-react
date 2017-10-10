import { reducer as bookingStatus } from './reducer'

import { actionCreators } from './actions'

describe('reducers/booking', () => {

  describe('#bookingStatus(state, action)', () => {
    it('returns false on BOOKING_REQUEST', () => {
      const state = bookingStatus({ bookingStatus: true }, actionCreators.bookingRequest())
      expect(state.bookingStatus).to.be.false
    })

    it('returns true on BOOKING_SUCCESS', () => {
      const state = bookingStatus({ bookingStatus: false }, actionCreators.bookingSuccess())
      expect(state.bookingStatus).to.be.true
    })

    it('returns false on BOOKING_FAILURE', () => {
      const error = new Error('oops')
      const state = bookingStatus({ bookingStatus: true }, actionCreators.bookingFailure(error))
      expect(state.bookingStatus).to.be.false
    })

    it('returns initialState when passed an unhandled action', () => {
      const state = bookingStatus({ bookingStatus: false }, { type: 'LEMON_CURRY' })
      expect(state.bookingStatus).to.be.false
    })

  })

})
