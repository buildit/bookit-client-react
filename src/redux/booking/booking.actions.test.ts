import { actionCreators } from './actions'

import { Booking } from 'Models'

describe('actions/booking', () => {
  describe('#bookingRequest()', () => {

    it('returns a redux action with no payload', () => {
      const expected = { type: 'BOOKING_REQUEST' }
      const actual = actionCreators.bookingRequest()

      expect(actual).to.deep.equal(expected)
    })

  })

  describe('#bookingSuccess()', () => {

    it('returns a redux action with no payload when called', () => {
      const booking: Booking = {bookingId: 1, bookableId: 1, subject: 'booked it', start: '', end: ''}
      const expected = { type: 'BOOKING_SUCCESS', payload: booking }
      const actual = actionCreators.bookingSuccess(booking)

      expect(actual).to.deep.equal(expected)
    })

  })

  describe('#bookingFailure()', () => {

    it('returns a redux action with payload when passed parameters', () => {
      const error = new Error('oops')
      const expected = { type: 'BOOKING_FAILURE', error: true, payload: error }
      const actual = actionCreators.bookingFailure(error)
      expect(actual).to.deep.equal(expected)
    })

  })
})
