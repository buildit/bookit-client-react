import { getBookingStatus } from './selectors'

describe('#getBookingStatus(state)', () => {
  it('returns true when state is true', () => {
    const state = { bookingStatus: true }
    expect(getBookingStatus(state)).to.be.true
  })

  it('returns false when state is false', () => {
    const state = { bookingStatus: false }
    expect(getBookingStatus(state)).to.be.false
  })
})
