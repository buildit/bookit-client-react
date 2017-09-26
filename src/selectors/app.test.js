import { getPingStatus } from './app'

describe('selectors/app', () => {

  describe('#getPingStatus(state)', () => {
    it('returns true when state is true', () => {
      const state = { pingStatus: true }
      expect(getPingStatus(state)).to.be.true
    })
    it('returns false when state is false', () => {
      const state = { pingStatus: false }
      expect(getPingStatus(state)).to.be.false
    })
  })

})
