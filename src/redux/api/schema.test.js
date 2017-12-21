import { normalize } from 'normalizr'

import {
  locationSchema,
  bookableSchema,
  bookingSchema,
  userSchema,
  // normalizeLocations,
  // normalizeBookables,
  normalizeBookings,
  // normalizeBooking,
  // availabilitySchema,
  // normalizeAvailability,
} from './schema'

describe('api/schema', () => {
  describe('location', () => {
    it('normalizes a single location entity', () => {
      const raw = { id: 'b1177996-75e2-41da-a3e9-fcdd75d1ab31', name: 'NYC', timeZone: 'America/New_York' }
      const actual = normalize(raw, locationSchema)

      expect(actual.result).to.equal(raw.id)
    })
  })

  describe('bookable', () => {
    it('normalizes a single bookable entity', () => {
      const raw = { id: 'cd87ee34-b393-4400-a1c9-d91278d4b8ee', location: { 'id': 'b1177996-75e2-41da-a3e9-fcdd75d1ab31' }, name: 'Dev Red', disposition: { closed: false, reason: ''}, bookings:[] }
      const actual = normalize(raw, bookableSchema)

      expect(actual.result).to.equal(raw.id)
      expect(actual.entities.bookables[raw.id].location).to.equal(raw.location.id)
    })
  })

  describe('booking', () => {
    it('normalizes a single booking entity and associated user entity', () => {
      const raw = { id: 'e081f498-151b-49bf-a302-6cf248c991f3', bookable: { 'id': 'cd87ee34-b393-4400-a1c9-d91278d4b8ee' }, subject: 'My Booking', start: '2017-12-17T00:00', end: '2017-12-17T01:00', user: { id: 'ff9391f6-a99b-43c4-8e75-9c91bada5397', name: 'Doe Jane', externalId: '160e0263-4f83-4a99-a2e5-177cd7e96d16' } }
      const actual = normalize(raw, bookingSchema)

      expect(actual.result).to.equal(raw.id)
      expect(Object.keys(actual.entities)).to.contain('bookings')
      expect(Object.keys(actual.entities)).to.contain('users')
    })
  })

  describe('user', () => {
    it('normalizes a single user entity', () => {
      const raw = { id: 'ff9391f6-a99b-43c4-8e75-9c91bada5397', name: 'Doe Jane', externalId: '160e0263-4f83-4a99-a2e5-177cd7e96d16' }
      const actual = normalize(raw, userSchema)

      expect(actual.result).to.equal(raw.externalId)
    })
  })

  describe('#normalizeLocations()', () => {})

  describe('#normalizeBookables()', () => {})

  describe('#normalizeBookings()', () => {
    it('should normalize and process a `getAllBookings` API response', () => {
      const raw = [{ id: 'f31c8d36-909c-4a38-a730-0224a1883751', bookable: { 'id': 'aab6d676-d3cb-4b9b-b285-6e63058aeda8' }, subject: 'My Bookable for Next Week', start: '2017-12-25T18:25', end: '2017-12-25T18:26', user: { id:'18420ed4-4ec5-4ae6-8085-d21bb8440527', name: 'Bruce Springsteen', externalId: 'aea828cc-8895-4ca6-a1a9-5d3e1a2ffd30' } } ]
      const expected = { entities: { bookings: { 'f31c8d36-909c-4a38-a730-0224a1883751': { id: 'f31c8d36-909c-4a38-a730-0224a1883751', subject: 'My Bookable for Next Week', start: '2017-12-25T18:25', end: '2017-12-25T18:26', bookable: 'aab6d676-d3cb-4b9b-b285-6e63058aeda8', user: 'aea828cc-8895-4ca6-a1a9-5d3e1a2ffd30' } }, users: { 'aea828cc-8895-4ca6-a1a9-5d3e1a2ffd30': { id: '18420ed4-4ec5-4ae6-8085-d21bb8440527', externalId: 'aea828cc-8895-4ca6-a1a9-5d3e1a2ffd30', name: 'Bruce Springsteen' } } }, result: { bookings: [ 'f31c8d36-909c-4a38-a730-0224a1883751' ], users: [ 'aea828cc-8895-4ca6-a1a9-5d3e1a2ffd30' ] } }
      const actual = normalizeBookings(raw)

      expect(actual).to.deep.equal(expected)
    })
    it('should return a collection of entities and results for both users and bookings even if the API responded with an empty list', () => {
      const raw = []
      const expected = { entities: { users: {}, bookings: {} }, result: { users: [], bookings: [] } }
      const actual = normalizeBookings(raw)

      expect(actual).to.deep.equal(expected)
    })
  })

  describe('#normalizeBooking()', () => {})

  describe('#availabilitySchema()', () => {})

  describe('#normalizeAvailability()', () => {})
})
