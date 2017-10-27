import { reducer as bookingReducer } from './reducer'

import { actionCreators } from './actions'

import { Booking } from 'Models'

describe('reducers/booking', () => {

  describe('#bookingStatus(state, action)', () => {
    it('returns false on BOOKING_REQUEST', () => {
      const state = bookingReducer.bookingStatus(true, actionCreators.bookingRequest())
      expect(state).to.be.false
    })

    it('returns true on BOOKING_SUCCESS', () => {
      const booking: Booking = {bookingId: 1, bookableId: 1, subject: 'booked it', start: '', end: ''}
      const state = bookingReducer.bookingStatus(false, actionCreators.bookingSuccess(booking))
      expect(state).to.be.true
    })

    it('returns false on BOOKING_FAILURE', () => {
      const error = new Error('oops')
      const state = bookingReducer.bookingStatus(true, actionCreators.bookingFailure(error))
      expect(state).to.be.false
    })

    it('returns initialState when passed an unhandled action', () => {
      const state = bookingReducer.bookingStatus(false, { type: 'LEMON_CURRY' })
      expect(state).to.be.false
    })
  })
})
