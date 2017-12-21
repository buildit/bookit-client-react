import { Map } from 'immutable'

import { app, errors } from './reducer'

describe('reducers/app', () => {

  describe('#app(state, action)', () => {
    it('returns selectedLocation on SET_SELECTED_LOCATION', () => {
      const state = app(Map(), { type: 'SET_SELECTED_LOCATION', payload: 'lemoncurry' })

      expect(state.get('selectedLocation')).to.equal('lemoncurry')
    })
  })

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
})
