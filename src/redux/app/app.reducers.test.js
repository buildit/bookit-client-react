import { requestInProgress, errors } from './reducer'

describe('reducers/app', () => {

  describe('#requestInProgress(state, action)', () => {
    it('returns true on CREATE_BOOKING_PENDING', () => {
      const state = requestInProgress(false, { type: 'CREATE_BOOKING_PENDING' })
      expect(state).to.be.true
    })

    it('returns false on CREATE_BOOKING_SUCCESS', () => {
      const state = requestInProgress(true, { type: 'CREATE_BOOKING_SUCCESS' })
      expect(state).to.be.false
    })

    it('returns false on CREATE_BOOKING_FAILURE', () => {
      const state = requestInProgress(true, { type: 'CREATE_BOOKING_FAILURE' })
      expect(state).to.be.false
    })

    it('returns initialState when passed an unhandled action', () => {
      const state = requestInProgress(false, { type: 'LEMON_CURRY' })
      expect(state).to.be.false
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
