import { actionCreators } from './actions'

describe('actions/booking', () => {
  describe('#createBooking()', () => {

    it('returns a redux action with no payload', () => {
      const expected = { type: 'CREATE_BOOKING' }
      const actual = actionCreators.createBooking()

      expect(actual).to.deep.equal(expected)
    })

  })
})
