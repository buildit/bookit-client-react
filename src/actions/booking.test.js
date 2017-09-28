import { bookingRequest, bookingSuccess, bookingFailure } from './booking'

describe('actions/booking', () => {
  describe('#bookingRequest()', () => {

    it('returns a redux action with no payload when called with no parameters', () => {
      const expected = { type: 'BOOKING_REQUEST' }
      const actual = bookingRequest()

      expect(actual).to.deep.equal(expected)
    })

    it('returns a redux action with payload when passed parameters', () => {
      const payload = 'test'
      const expected = { type: 'BOOKING_REQUEST', payload: payload }
      const actual = bookingRequest(payload)

      expect(actual).to.deep.equal(expected)
    })

  })

  describe('#bookingSuccess()', () => {

    it('returns a redux action with no payload when called with no parameters', () => {
      const expected = { type: 'BOOKING_SUCCESS' }
      const actual = bookingSuccess()

      expect(actual).to.deep.equal(expected)
    })

    it('returns a redux action with payload when passed parameters', () => {
      const payload = 'test'
      const expected = { type: 'BOOKING_SUCCESS', payload: payload }
      const actual = bookingSuccess(payload)

      expect(actual).to.deep.equal(expected)
    })

  })

  describe('#bookingFailure()', () => {

    it('returns a redux action with no payload when called with no parameters', () => {
      const expected = { type: 'BOOKING_FAILURE' }
      const actual = bookingFailure()

      expect(actual).to.deep.equal(expected)
    })

    it('returns a redux action with payload when passed parameters', () => {
      const payload = 'test'
      const expected = { type: 'BOOKING_FAILURE', payload: payload }
      const actual = bookingFailure(payload)

      expect(actual).to.deep.equal(expected)
    })

  })
})
