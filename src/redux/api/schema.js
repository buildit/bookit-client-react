import { normalize, schema } from 'normalizr'

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

export const availability = new schema.Entity('availability', {}, {
  processStrategy: ({ id, disposition, bookings }) => {
    const { closed/*, reason*/ } = disposition

    let bookingIntervals = []

    if (!closed) {
      bookingIntervals = bookingIntervals.concat(bookings.map(({ start, end }) => ({ start, end })))
    }
    return { id, closed, intervals: bookingIntervals }
  },
})

export const locationList = [ location ]
export const bookableList = [ bookable ]
export const bookingList = [ booking ]
export const availabilityList = [ availability ]

export const normalizeLocations = data => normalize(data, locationList)
export const normalizeBookables = data => normalize(data, bookableList)

export const normalizeBookings = data => normalize(data, bookingList)
export const normalizeBooking = (data) => {
  const { entities, result } = normalize(data, booking)
  return { entities, result: [ result ] }
}

export const normalizeAvailability = data => normalize(data, availabilityList)
