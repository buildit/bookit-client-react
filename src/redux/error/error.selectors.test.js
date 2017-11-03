import { getErrorMessage } from './selectors'

describe('selectors/getErrorMessage', () => {

  describe('#getErrorMessage(state)', () => {
    it('returns message when state has an error', () => {
      const state = { error: { response: { message: 'foo'} } }
      expect(getErrorMessage(state)).to.equal('foo')
    })

    it('returns undefined when state does not have an error', () => {
      const state = { }
      expect(getErrorMessage(state)).to.be.undefined
    })
  })

})
