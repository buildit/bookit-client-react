import { normalize, schema } from 'normalizr'

import { createIntervalTree } from 'Utils'

export const location = new schema.Entity('locations', {})

export const bookable = new schema.Entity('bookables', {}, {
  processStrategy: ({ id, name, locationId, disposition }) => ({
    id,
    name,
    location: locationId,
    disposition,
  }),
})

export const booking = new schema.Entity('bookings', {}, {
  processStrategy: ({ id, subject, start, end, bookableId, user }) => ({
    id,
    subject,
    start,
    end,
    bookable: bookableId,
    user,
  }),
})

export const user = new schema.Entity('users', {}, {
  processStrategy: ({ id, name }) => ({ id, name }),
})

booking.define({ bookable, user })

export const normalizeLocations = data => normalize(data, [ location ])
export const normalizeBookables = data => normalize(data, [ bookable ])

export const normalizeBookings = data => normalize(data, [ booking ])
export const normalizeBooking = (data) => {
  const { entities, result } = normalize(data, booking)
  return { entities, result: [ result ] }
}

// The following two Entities exist to support computation of availability
// on a set of bookables for a given date.
//
// These entities are not meant to be persisted, their only purpose is to
// transform raw getAllBookables response data to a single intervaltree
// that we can perform searches against using start and end date/times

export const bookingAvailability = new schema.Entity(
  'bookings', {},
  {
    processStrategy: ({ id: booking, bookableId: bookable, start, end }) => [
      start, end, { bookable, booking },
    ],
  }
)

export const bookableAvailability = new schema.Entity(
  'bookables', { bookings: [ bookingAvailability ] },
  {
    processStrategy: ({ id, disposition: { reason: closed } }) => ({
      id, closed,
    }),
  }
)

export const normalizeAvailability = (data) => {
  const { entities: { bookings } } = normalize(data, [ bookableAvailability ])
  return createIntervalTree(
    Object.values(bookings).reduce((acc, booking) => acc.concat([ booking ]), [])
  )
}
