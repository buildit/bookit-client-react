import { Map, Set } from 'immutable'

import { formValueSelector } from 'redux-form'

import { createSelector } from 'reselect'
import { createGetSelector } from 'reselect-immutable-helpers'

import { doesRangeOverlap, formatDate, isSameDay, compareDates } from 'Utils'

// ### Baseline selectors ----------------------------------------------------

export const getEntities = state => state.entities

export const getBookings = state => getEntities(state).get('bookings')
export const getBookingIds = state => getBookings(state).get('result').toArray()
export const getBookingEntities = state => getBookings(state).get('entities', Map())

export const getLocations = state => getEntities(state).get('locations')
export const getLocationIds = state => getLocations(state).get('result').toArray()
export const getLocationEntities = state => getLocations(state).get('entities', Map())

export const getBookables = state => getEntities(state).get('bookables')
export const getBookableIds = state => getBookables(state).get('result').toArray()
export const getBookableEntities = state => getBookables(state).get('entities', Map())

// ### Bookings --------------------------------------------------------------

export const getBookingEntity = (state, props) => getBookingEntities(state).get(props.id, null)

// export const getBookingId = createGetSelector(getBookingEntity, 'id', null)
export const getBookingSubject = createGetSelector(getBookingEntity, 'subject', null)
export const getBookingStart = createGetSelector(getBookingEntity, 'start', null)
export const getBookingEnd = createGetSelector(getBookingEntity, 'end', null)
export const getBookingBookable = createGetSelector(getBookingEntity, 'bookable', null)

// Private helper for relating a bookable entity to a booking via the booking' bookable id
const getBookingBookableEntity = createSelector(
  [ getBookingBookable, getBookableEntities ],
  (bookingBookable, bookables) => bookables.find((value, key) => key === bookingBookable) || Map()
)

export const getBookingBookableName = createGetSelector(getBookingBookableEntity, 'name', null)

export const getBookingDates = createSelector(
  [ getBookingIds, getBookingEntities ],
  (bookingIds, bookings) => Set(bookingIds.map(id => formatDate(bookings.getIn([id, 'start'])))).sort().toArray()
)

// Private helper for selecting bookings for a given date (ie. GroupedBookingsList)
const getDateForBookings = (state, props) => props.date

export const getBookingsForDate = createSelector(
  [ getDateForBookings, getBookingIds, getBookingEntities ],
  (date, bookingIds, bookings) => {
    return bookingIds.filter(id => isSameDay(bookings.getIn([id, 'start']), date)).sort((a, b) => {
      return compareDates(bookings.getIn([a, 'start']), bookings.getIn([b, 'start']))
    })
  }
)

// ### Locations -------------------------------------------------------------

export const getLocationEntity = (state, props) => getLocationEntities(state).get(props.id, null)

// export const getLocationId = createGetSelector(getLocationEntity, 'id', null)
export const getLocationName = createGetSelector(getLocationEntity, 'name', null)
export const getLocationTimezone = createGetSelector(getLocationEntity, 'timeZone', null)

// ### Bookables -------------------------------------------------------------

export const getBookableEntity = (state, props) => getBookableEntities(state).get(props.id, null)

export const getBookableId = createGetSelector(getBookableEntity, 'id', null)
export const getBookableName = createGetSelector(getBookableEntity, 'name', null)
export const getBookableDisposition = createGetSelector(getBookableEntity, 'disposition', Map())

const getBookableBookings = createSelector(
  [ getBookableId, getBookingIds, getBookingEntities ],
  (bookableId, bookingIds, bookings) => bookingIds.filter(id => bookings.getIn([id, 'bookable']) === bookableId)
)

export const isBookableClosed = createSelector(
  [ getBookableDisposition ],
  disposition => disposition.get('closed')
)

// Support selector for isBookableBooked
const getBookingFormDateRange = state => formValueSelector('booking')(state, 'start', 'end')

// TODO: make `existingBookingRanges` its own selector to memoize and SAVE TIME!
export const isBookableBooked = createSelector(
  [ getBookableBookings, getBookingEntities, getBookingFormDateRange ],
  (bookingIds, bookings, bookingFormDateRange) => {
    const existingBookingRanges = bookingIds.map(id => ({ end: bookings.getIn([id, 'end']), start: bookings.getIn([id, 'start']) }))
    return doesRangeOverlap(bookingFormDateRange, existingBookingRanges)
  }
)

export const isBookableAvailable = createSelector(
  [ isBookableClosed, isBookableBooked ],
  (closed, booked) => !closed && !booked
)

export const getBookableLocation = createGetSelector(getBookableEntity, 'location', null)

const getBookableLocationEntity = createSelector(
  [ getBookableLocation, getLocationEntities ],
  (bookableLocation, locations) => locations.find((value, key) => key === bookableLocation)
)

export const getBookableLocationName = createGetSelector(getBookableLocationEntity, 'name', null)
export const getBookableLocationTimezone = createGetSelector(getBookableLocationEntity, 'timeZone', null)

export const getBookablesForLocation = createSelector(
  [
    (state, locationId) => locationId,
    getBookableIds,
    getBookableEntities,
  ],
  (locationId, bookableIds, bookables) => bookableIds.filter(id => bookables.getIn([id, 'location']) === locationId)
)

// we can get state as a parameter
//  - just needed to pass an input-selector that simply
// returns state instead of Thing-On-State. Gah.
export const getBookingOverlaps = createSelector(
  [ getBookablesForLocation, getBookingEntities, getBookingFormDateRange, state => state ],
  (bookableIds, bookings, bookingFormDateRange, state) => {
    return Map(
      bookableIds.map((id) => {
        const bookableBookings = getBookableBookings(state, { id })
        const bookingRanges = bookableBookings.map(id => ({ end: bookings.getIn([id, 'end']), start: bookings.getIn([id, 'start']) }) )
        return [ id, doesRangeOverlap(bookingFormDateRange, bookingRanges) ]
      })
    )
  }
)

export const getBookablesSortedByAvailability = createSelector(
  [ getBookablesForLocation, getBookableEntities, getBookingOverlaps ],
  (bookableIds, bookables, bookingOverlaps) => bookableIds.sort((a, b) => {
    const isAvailableA = !bookables.getIn([a, 'disposition', 'closed']) && !bookingOverlaps.get(a)
    const isAvailableB = !bookables.getIn([b, 'disposition', 'closed']) && !bookingOverlaps.get(b)
    // No, really! subtracting a boolean from a boolean will return -1, 0 or 1!
    // B - A === available bookables are first, A - B === unavailable bookables are first
    return isAvailableB - isAvailableA
  })
)
