import { getErrorMessages } from './selectors'

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
