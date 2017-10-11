import { deriveAPIEndpoint } from './get-location'

describe('BookIt API URL tests', () => {

  describe('derives an non-production environment api endpoint', () => {
    it('generates the integration URL', () => {
      const state = deriveAPIEndpoint('integration-bookit-client-react.buildit.tools')
      expect(state).to.be.equal('integration-bookit-api.buildit.tools')
    })
  })

  describe('derives a production environment api endpoint', () => {
    it('generates the production URL', () => {
      const state = deriveAPIEndpoint('bookit-client-react.buildit.tools')
      expect(state).to.be.equal('bookit-api.buildit.tools')
    })
  })

  describe('derives a local api endpoint', () => {
    it('generates the localhost URL', () => {
      const state = deriveAPIEndpoint('http://localhost:3001')
      expect(state).to.be.equal('http://localhost:8080')
    })
})
