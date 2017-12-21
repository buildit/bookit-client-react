import { Map } from 'immutable'

import {
  getSelectedLocation,
  getRouterLocation,
  getErrorMessages,
} from './selectors'

describe('selectors/app', () => {

  describe('#getSelectedLocation(state)', () => {
    it('returns selectedLocation', () => {
      const state = { app: Map({ selectedLocation: '123abc' }) }
      expect(getSelectedLocation(state)).to.equal('123abc')
    })
  })

  describe('#getRouterLocation(state)', () => {
    it('returns the current router location', () => {
      const state = { router: { location: '/home' } }
      expect(getRouterLocation(state)).to.equal('/home')
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
