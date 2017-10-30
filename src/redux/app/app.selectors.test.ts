import { getRequestInProgress } from './selectors'

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

})
