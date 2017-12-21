import { normalize, schema } from 'normalizr'

import { createIntervalTree } from 'Utils'

export const location = new schema.Entity('locations', {})

export const bookable = new schema.Entity('bookables', {}, {
  processStrategy: ({ id, name, location, disposition }) => ({
    id,
    name,
    location: location.id,
    disposition,
  }),
})

export const booking = new schema.Entity('bookings', {}, {
  processStrategy: ({ id, subject, start, end, bookable, user }) => ({
    id,
    subject,
    start,
    end,
    bookable: bookable.id,
    user,
  }),
})

export const user = new schema.Entity('users', {}, {
  idAttribute: 'externalId',
  processStrategy: ({ id, externalId, name }) => ({ id, externalId, name }),
})

booking.define({ bookable, user })

export const normalizeLocations = data => normalize(data, [ location ])
export const normalizeBookables = data => normalize(data, [ bookable ])

export const normalizeBookings = data => normalize(data, [ booking ])
export const normalizeBooking = (data) => {
  const { entities, result } = normalize(data, booking)
  return { entities, result: [ result ] }
}

export const availabilitySchema = new schema.Entity('availability', {}, {
  processStrategy: ({ id, name, disposition: { closed, reason }, bookings }) => {
    const tree = createIntervalTree(
      bookings.map(({ start, end, user: { name } }) => [ start, end, { name } ])
    )
    return { id, name, closed, reason, bookings: tree }
  },
})

export const normalizeAvailability = (data, start, end) => {
  const { entities: { availability } } = normalize(data, [ availabilitySchema ])
  return Object.values(availability).map(({ id, name, closed, reason, bookings }) => {
    if (!closed) {
      const overlaps = bookings.search(start, end)
      closed = Boolean(overlaps.length)
      reason = closed ? `Booked by ${overlaps[0].name}` : reason
    }
    return { bookableId: id, name, closed, reason }
  }).sort((a, b) => a.closed - b.closed)
}
