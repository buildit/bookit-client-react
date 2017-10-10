import { actionCreators } from './actions'

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
      const expected = { type: 'BOOKING_SUCCESS' }
      const actual = actionCreators.bookingSuccess()

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
