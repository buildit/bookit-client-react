import { Map, List } from 'immutable'

import { formValueSelector } from 'redux-form'

import { createSelector } from 'reselect'
import { createGetSelector } from 'reselect-immutable-helpers'

import startOfDay from 'date-fns/start_of_day'
// import format from 'date-fns/format'

import { doesRangeOverlap } from 'Utils'

// ### Baseline selectors ----------------------------------------------------

export const getBookings = state => state.bookings
export const getBookingIds = state => getBookings(state).get('result').toArray()
export const getBookingEntities = state => getBookings(state).get('entities', Map())

export const getLocations = state => state.locations
export const getLocationIds = state => getLocations(state).get('result').toArray()
export const getLocationEntities = state => getLocations(state).get('entities', Map())

export const getBookables = state => state.bookables
export const getBookableIds = state => getBookables(state).get('result').toArray()
export const getBookableEntities = state => getBookables(state).get('entities', Map())

// ### Bookings --------------------------------------------------------------

export const getBookingEntity = (state, props) => getBookingEntities(state).get(props.id, null)

// export const getBookingId = createGetSelector(getBookingEntity, 'id', null)
export const getBookingSubject = createGetSelector(getBookingEntity, 'subject', null)
export const getBookingStart = createGetSelector(getBookingEntity, 'start', null)
export const getBookingEnd = createGetSelector(getBookingEntity, 'end', null)
export const getBookingBookable = createGetSelector(getBookingEntity, 'bookable', null)
export const getBookingBookableEntity = createSelector(
  [ getBookingBookable, getBookableEntities ],
  (bookable, bookables) => bookables.get(bookable)
)
export const getBookingBookableName = createGetSelector(getBookingBookableEntity, 'name', null)
export const getBookingsGroupedByDay = createSelector(
  [ getBookingEntities ],
  (bookings) => {
    const groupedBookings = bookings.groupBy(booking => startOfDay(booking.get('start')))
    groupedBookings.map((value, key) => {
      const newObj = {
        date: key,
        bookings: value.map(v => v.get('id')).toArray(),
      }
      console.log('newObj', newObj)
      return newObj
    })
    return groupedBookings
  }
)

// ### Locations -------------------------------------------------------------

export const getLocationEntity = (state, props) => getLocationEntities(state).get(props.id, null)

// export const getLocationId = createGetSelector(getLocationEntity, 'id', null)
export const getLocationName = createGetSelector(getLocationEntity, 'name', null)
export const getLocationTimezone = createGetSelector(getLocationEntity, 'timeZone', null)

// ### Bookables -------------------------------------------------------------

export const getBookableEntity = (state, props) => getBookableEntities(state).get(props.id, null)

// export const getBookableId = createGetSelector(getBookableEntity, 'id', null)
export const getBookableName = createGetSelector(getBookableEntity, 'name', null)
export const getBookableDisposition = createGetSelector(getBookableEntity, 'disposition', Map())
export const getBookableBookings = createGetSelector(getBookableEntity, 'bookings', List())

export const isBookableClosed = createSelector(
  [ getBookableDisposition ],
  disposition => disposition.get('closed')
)

// Support selectors for isBookableBooked
const bookingFormSelector = formValueSelector('booking')
const getBookingDateRange = state => bookingFormSelector(state, 'start', 'end')

export const isBookableBooked = createSelector(
  [ getBookableBookings, getBookingEntities, getBookingDateRange ],
  (bookingIds, bookings, bookingDateRange) => {
    const existingBookingRanges = bookingIds.map(id => ({ end: bookings.getIn([id, 'end']), start: bookings.getIn([id, 'start']) }))
    return doesRangeOverlap(bookingDateRange, existingBookingRanges)
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
