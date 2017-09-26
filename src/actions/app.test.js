import { pingRequest, pingSuccess, pingFailure } from './app'

describe('actions/app', () => {
  describe('#pingRequest()', () => {

    it('returns a redux action with no payload when called with no parameters', () => {
      const expected = { type: 'PING_REQUEST' }
      const actual = pingRequest()

      expect(actual).to.deep.equal(expected)
    })

    it('returns a redux action with payload when passed parameters', () => {
      const payload = 'test'
      const expected = { type: 'PING_REQUEST', payload: payload }
      const actual = pingRequest(payload)

      expect(actual).to.deep.equal(expected)
    })

  })

  describe('#pingSuccess()', () => {

    it('returns a redux action with no payload when called with no parameters', () => {
      const expected = { type: 'PING_SUCCESS' }
      const actual = pingSuccess()

      expect(actual).to.deep.equal(expected)
    })

    it('returns a redux action with payload when passed parameters', () => {
      const payload = 'test'
      const expected = { type: 'PING_SUCCESS', payload: payload }
      const actual = pingSuccess(payload)

      expect(actual).to.deep.equal(expected)
    })

  })

  describe('#pingFailure()', () => {

    it('returns a redux action with no payload when called with no parameters', () => {
      const expected = { type: 'PING_FAILURE' }
      const actual = pingFailure()

      expect(actual).to.deep.equal(expected)
    })

    it('returns a redux action with payload when passed parameters', () => {
      const payload = 'test'
      const expected = { type: 'PING_FAILURE', payload: payload }
      const actual = pingFailure(payload)

      expect(actual).to.deep.equal(expected)
    })

  })
})
