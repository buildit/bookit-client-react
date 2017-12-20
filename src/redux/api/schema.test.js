import { normalize } from 'normalizr'

import {
  location,
  bookable,
  booking,
  user,
  // normalizeLocations,
  // normalizeBookables,
  // normalizeBookings,
  // normalizeBooking,
  // availabilitySchema,
  // normalizeAvailability,
} from './schema'

describe('api/schema', () => {
  describe('location', () => {
    it('normalizes a single location entity', () => {
      const raw = { id: 'b1177996-75e2-41da-a3e9-fcdd75d1ab31', name: 'NYC', timeZone: 'America/New_York' }
      const actual = normalize(raw, location)

      expect(actual.result).to.equal(raw.id)
    })
  })

  describe('bookable', () => {
    it('normalizes a single bookable entity', () => {
      const raw = { id: 'cd87ee34-b393-4400-a1c9-d91278d4b8ee', locationId: 'b1177996-75e2-41da-a3e9-fcdd75d1ab31', name: 'Dev Red', disposition: { closed: false, reason: ''}, bookings:[] }
      const actual = normalize(raw, bookable)

      expect(actual.result).to.equal(raw.id)
      expect(actual.entities.bookables[raw.id].location).to.equal(raw.locationId)
    })
  })

  describe('booking', () => {
    it('normalizes a single booking entity and associated user entity', () => {
      const raw = { id: 'e081f498-151b-49bf-a302-6cf248c991f3', bookableId: 'cd87ee34-b393-4400-a1c9-d91278d4b8ee', subject: 'My Booking', start: '2017-12-17T00:00', end: '2017-12-17T01:00', user: { id: 'ff9391f6-a99b-43c4-8e75-9c91bada5397', name: 'Doe Jane', externalId: '160e0263-4f83-4a99-a2e5-177cd7e96d16' } }
      const actual = normalize(raw, booking)

      expect(actual.result).to.equal(raw.id)
      expect(Object.keys(actual.entities)).to.contain('bookings')
      expect(Object.keys(actual.entities)).to.contain('users')
    })
  })

  describe('user', () => {
    it('normalizes a single user entity', () => {
      const raw = { id: 'ff9391f6-a99b-43c4-8e75-9c91bada5397', name: 'Doe Jane', externalId: '160e0263-4f83-4a99-a2e5-177cd7e96d16' }
      const actual = normalize(raw, user)

      expect(actual.result).to.equal(raw.externalId)
    })
  })

  describe('#normalizeLocations()', () => {})

  describe('#normalizeBookables()', () => {})

  describe('#normalizeBookings()', () => {})

  describe('#normalizeBooking()', () => {})

  describe('#availabilitySchema()', () => {})

  describe('#normalizeAvailability()', () => {})
})
