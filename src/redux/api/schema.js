import { normalize, schema } from 'normalizr'

export const location = new schema.Entity('locations', {})

export const bookable = new schema.Entity('bookables', {}, {
  processStrategy: ({ id, name, locationId, disposition, bookings }) => ({
    id,
    name,
    location: locationId,
    disposition,
    bookings,
  }),
})

export const booking = new schema.Entity('bookings', {}, {
  processStrategy: ({ id, subject, start, end, bookableId }) => ({
    id,
    subject,
    start,
    end,
    bookable: bookableId,
  }),
})

bookable.define({ bookings: [ booking ] })
booking.define({ bookable })

export const locationList = [ location ]
export const bookableList = [ bookable ]
export const bookingList = [ booking ]

export const normalizeLocations = data => normalize(data, locationList)
export const normalizeBookables = data => normalize(data, bookableList)
export const normalizeBookings = data => normalize(data, bookingList)
