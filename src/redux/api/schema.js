import { normalize, schema } from 'normalizr'

// const commonOptions =   {
//   idAttribute: 'email',
//   processStrategy: ({ name, email }) => ({ name, email }),
// }

export const location = new schema.Entity('locations', {})
export const bookable = new schema.Entity('bookables', {})
export const booking = new schema.Entity('bookings', {})

export const locationList = [ location ]
export const bookableList = [ bookable ]
export const bookingList = [ booking ]

export const normalizeLocations = data => normalize(data, locationList)
export const normalizeBookables = data => normalize(data, bookableList)
export const normalizeBookings = data => normalize(data, bookingList)

// Location from /v1/location
// {
//   "id": 1,
//   "name": "NYC",
//   "timeZone": "America/New_York"
// }

// Bookable from /v1/location/{locationId}/bookable
// {
//   "bookings": null,
//   "name": "Red",
//   "id": 1,
//   "locationId": 1,
//   "available": true
// }

// Booking from /v1/booking
// {
//   "bookableId": 0,
//   "end": "2017-11-02T20:16:26.943Z",
//   "id": 0,
//   "start": "2017-11-02T20:16:26.943Z",
//   "subject": "string"
// }
