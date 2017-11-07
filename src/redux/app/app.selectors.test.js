import { getRequestInProgress, getErrorMessages } from './selectors'

describe('selectors/app', () => {

  describe('#getRequestInProgress(state)', () => {
    it('returns true when state is true', () => {
      const state = { requestInProgress: true }
      expect(getRequestInProgress(state)).to.be.true
    })

    it('returns false when state is false', () => {
      const state = { requestInProgress: false }
      expect(getRequestInProgress(state)).to.be.false
    })
  })

  describe('#getErrorMessages(state)', () => {
    it('returns message when state has an error', () => {
      const state = { errors: [{ response: { message: 'foo' } }] }
      expect(getErrorMessages(state)).to.contain('foo')
    })

    it('returns undefined when state does not have an error', () => {
      const state = { errors: [] }
      expect(getErrorMessages(state)).to.be.undefined
    })
  })

})
