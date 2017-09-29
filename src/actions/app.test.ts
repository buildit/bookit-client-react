import { pingRequest, pingSuccess, pingFailure } from './app'

describe('actions/app', () => {
  describe('#pingRequest()', () => {

    it('returns the a redux action with the correct type', () => {
      const expected = { type: 'PING_REQUEST' }
      const actual = pingRequest()

      expect(actual).toEqual(expected)
    })

  })

  describe('#pingSuccess()', () => {

    it('returns the a redux action with the correct type', () => {
      const expected = { type: 'PING_SUCCESS' }
      const actual = pingSuccess()

      expect(actual).toEqual(expected)
    })

  })

  describe('#pingFailure()', () => {

    it('returns the a redux action with the correct type', () => {
      const expected = { type: 'PING_FAILURE' }
      const actual = pingFailure()

      expect(actual).toEqual(expected)
    })

  })
})
