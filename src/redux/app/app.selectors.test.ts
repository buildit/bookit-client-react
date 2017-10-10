import { getRequestInProgress } from './selectors'

describe('selectors/app', () => {

  describe('#getRequestInProgress(state)', () => {
    it('returns true when state is true', () => {
      const state = { app: { requestInProgress: true } }
      expect(getRequestInProgress(state)).to.be.true
    })

    it('returns false when state is false', () => {
      const state = { app: { requestInProgress: false } }
      expect(getRequestInProgress(state)).to.be.false
    })
  })

})
