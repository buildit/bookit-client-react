import { errors } from './reducer'

describe('#errors(state, action)', () => {
  it('returns [] on CLEAR_ERRORS', () => {
    const state = errors([{}], { type: 'CLEAR_ERRORS' })
    expect(state).to.be.empty
  })

  it('appens error on APPEND_ERROR', () => {
    const state = errors([{}], { type: 'APPEND_ERROR', payload: {} })
    expect(state).to.have.length(2)
  })

  it('returns initialState when passed an unhandled action', () => {
    const state = errors([], { type: 'LEMON_CURRY' })
    expect(state).to.be.empty
  })
})
