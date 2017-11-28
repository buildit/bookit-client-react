import { normalize, schema } from 'normalizr'

import { formatDate } from 'Utils'

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
  processStrategy: ({ id, subject, start, end, bookableId }) => ({
    id,
    subject,
    start,
    end,
    date: formatDate(start),
    bookable: bookableId,
  }),
})

booking.define({ bookable })

export const locationList = [ location ]
export const bookableList = [ bookable ]
export const bookingList = [ booking ]

export const normalizeLocations = data => normalize(data, locationList)
export const normalizeBookables = data => normalize(data, bookableList)

export const normalizeBookings = data => normalize(data, bookingList)
export const normalizeBooking = (data) => {
  const { entities, result } = normalize(data, booking)
  return { entities, result: [ result ] }
}
